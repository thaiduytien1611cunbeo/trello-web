import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'

import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

import Column from './ListColumns/Column/Column'
import TrelloCard from './ListColumns/Column/ListCards/Card/TrelloCard'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // Dùng pointerSensor thì trên web cũng ok nhưng trên mobile đang gặp bug nhé
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 }
  })
  // Yêu cầu phải kéo item di chuyển khoảng 10px thì mới kích hoạt event onDragEnd
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 3, delay: 250, tolerance: 10 }
  })
  // Nhấn dữ 250ms và Cần di chuyển chuột ít nhất 5px thì kích hoạt event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { distance: 10 }
  })
  // const sensors = useSensors(pointerSensor);
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = cardId => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = event => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragOver = event => {
    // vì chỉ cần xử lý kéo thả CARD nên nếu đang kéo COLUMN thì mặc kệ
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Xử lý kéo thả CARD
    const { active, over } = event
    // kéo đi chỗ linh tinh thì over = null
    if (!active || !over) return

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // check nếu 2 column khác nhau thì mới xử lý
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        const overCardIndex = overColumn?.card?.findIndex(card => card._id === overCardId)

        let newCardIndex

        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards.length + 1

        // clone từ column cũ ra để return về column mới (dùng thư viện lodash)
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if (nextActiveColumn) {
          // Xóa card ở column đang active
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            card => card._id !== activeDraggingCardId
          )
          // Cập nhật lại cardOrderIds
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }
        if (nextOverColumn) {
          // Kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nếu có thì phải xóa đi
          nextOverColumn.cards = nextOverColumn.cards.filter(
            card => card._id !== activeDraggingCardId
          )
          // Thêm card đang kéo vào overColumn theo vị trí index mới (newCardIndex)
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          )
          // Cập nhật lại cardOrderIds
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }
        return nextColumns
      })
    }
  }

  const handleDragEnd = event => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      return
    }

    const { active, over } = event

    // kéo đi chỗ linh tinh thì over = null
    if (!active || !over) return

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      // Dùng để sắp xếp lại column ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)

      // console.log(dndOrderedColumns);
      // const dndOrderedColumnsIds = dndOrderedColumns?.map((c) => c._id);
      // console.log(dndOrderedColumnsIds);

      setOrderedColumns(dndOrderedColumns)
    }
    //set data của column hoặc card về null
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const dropAnimationConfig = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: theme => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: theme => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimationConfig}>
          {!activeDragItemType && null}
          {activeDragItemType === 'ACTIVE_DRAG_ITEM_TYPE_COLUMN' && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === 'ACTIVE_DRAG_ITEM_TYPE_CARD' && (
            <TrelloCard card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent

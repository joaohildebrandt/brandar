// import { cn } from '@utils/style'
// import { format, isSameDay, isSameMonth, isToday } from 'date-fns'
// import { useCalendar } from '../index'
// import { WeekDayCell } from '../components/cells/week-day-cell'
// import { useState } from 'react'

// // Número máximo de eventos para mostrar por dia antes do botão "Ver mais"
// const MAX_EVENTS_PER_DAY = 2

// function DayCell({ date, events, isCurrentMonth, onEventClick, onCellClick }) {
//   const dayNumber = format(date, 'd')
//   const isTodayDate = isToday(date)

//   // Limitamos os eventos visíveis ao máximo definido
//   const visibleEvents = events.slice(0, MAX_EVENTS_PER_DAY)
//   // Verificamos se há eventos adicionais não mostrados
//   const hasMoreEvents = events.length > MAX_EVENTS_PER_DAY
//   // Número de eventos ocultos
//   const hiddenEventsCount = events.length - MAX_EVENTS_PER_DAY

//   const handleClick = () => {
//     onCellClick(date)
//   }

//   const handleEventClick = (event, e) => {
//     e.stopPropagation()
//     onEventClick(event)
//   }

//   const handleViewMoreClick = (e) => {
//     e.stopPropagation()
//     console.log('Todos os eventos do dia:', date.toDateString(), events)
//   }

//   return (
//     <div
//       role="button"
//       className={cn(
//         'h-full p-1 border rounded-md flex flex-col',
//         !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
//       )}
//       onClick={handleClick}
//     >
//       <div className="flex justify-between items-start">
//         <span
//           className={cn(
//             'inline-flex h-6 w-6 items-center justify-center rounded-full text-sm',
//             isTodayDate ? 'bg-primary text-white' : 'text-gray-700'
//           )}
//         >
//           {dayNumber}
//         </span>
//       </div>

//       <div className="mt-1 space-y-1 overflow-y-auto flex-grow">
//         {visibleEvents.map((event) => (
//           <div
//             key={event.id}
//             role="button"
//             className={cn(
//               'text-xs px-2 py-1 rounded-sm truncate cursor-pointer hover:opacity-80',
//               'bg-gray-100 text-gray-800'
//             )}
//             onClick={(e) => handleEventClick(event, e)}
//           >
//             {event.title}
//           </div>
//         ))}

//         {/* Botão "Ver mais" quando há eventos adicionais */}
//         {hasMoreEvents && (
//           <button
//             className="text-xs w-full text-center text-blue-600 hover:text-blue-800 font-medium py-1"
//             onClick={handleViewMoreClick}
//           >
//             +{hiddenEventsCount} mais
//           </button>
//         )}
//       </div>
//     </div>
//   )
// }

// export function MonthView({ onEventClick, onCellClick }) {
//   const { current, events } = useCalendar()

//   // Find events for a specific date
//   const getEventsForDate = (date) => {
//     return events.filter((event) => isSameDay(new Date(event.date), date))
//   }

//   return (
//     <div className="p-1 flex flex-col h-full">
//       <div className="grid grid-cols-7 gap-1 mb-1">
//         {current.week.interval.map((date) => (
//           <WeekDayCell key={date.toISOString()} isWeekDay={isToday(date)}>
//             {format(date, 'EEE')}
//           </WeekDayCell>
//         ))}
//       </div>
//       {/* Calendar grid */}
//       <div className="grid grid-cols-7 gap-1 flex-grow auto-rows-fr">
//         {current.month.intervalWithWeeks.map((day, idx) => {
//           const dayEvents = getEventsForDate(day)
//           const isCurrentMonth = isSameMonth(day, current.date)

//           return (
//             <DayCell
//               key={idx}
//               date={day}
//               events={dayEvents}
//               isCurrentMonth={isCurrentMonth}
//               onEventClick={onEventClick}
//               onCellClick={onCellClick}
//             />
//           )
//         })}
//       </div>
//     </div>
//   )
// }

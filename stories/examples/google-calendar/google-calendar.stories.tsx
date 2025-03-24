// import React from "react";
// import type { Meta, StoryObj } from "@storybook/react";
// import styles from "./google-calendar.module.css";

// import { Container } from "../../src/grid-view/components/container/container";
// import { Header } from "../../src/grid-view/components/header/header";
// import { CornerCell } from "../../src/grid-view/components/corner-cell/corner-cell";
// import {
//   DayCell,
//   DayCellDay,
//   DayCellWeekDay,
// } from "../../src/grid-view/components/day-cell/day-cell";
// import { Body } from "../../src/grid-view/components/body/body";
// import { HoursColumn } from "../../src/grid-view/components/hours-column/hours-column";
// import { TimeGrid } from "../../src/grid-view/components/time-grid/time-grid";
// import { TimeGridColumn } from "../../src/grid-view/components/time-grid-column/time-grid-column";
// import { TimeGridCell } from "../../src/grid-view/components/time-grid-cell/time-grid-cell";
// import { ItemGroup } from "../../src/grid-view/components/item-group/item-group";
// import { Item } from "../../src/grid-view/components/item/item";
// import { ItemContent } from "../../src/grid-view/components/item-content/item-content";
// import { TimeGridSelection } from "../../src/grid-view/components/time-grid-selection/time-grid-selection";
// import { TimeGridSelectionArea } from "../../src/grid-view/components/time-grid-selection-area/time-grid-selection-area";
// import { TimeMarker } from "../../src/grid-view/components/time-marker/time-marker";
// import { HourCell } from "../../src/grid-view/components/hour-cell/hour-cell";
// import { AllDay } from "../../src/grid-view/components/all-day/all-day";
// import { AllDayItem } from "../../src/grid-view/components/all-day-item/all-day-item";
// import { AllDayItemGroup } from "../../src/grid-view/components/all-day-item-group/all-day-item-group";
// import { AllDayBody } from "../../src/grid-view/components/all-day-body/all-day-body";
// import { AllDaySelection } from "../../src/grid-view/components/all-day-selection/all-day-selection";
// import { AllDaySelectionArea } from "../../src/grid-view/components/all-day-selection-area/all-day-selection-area";
// import { Calendar } from "../../src/core/components/calendar";
// import { GridView } from "../../src/grid-view/components/grid-view/grid-view";
// import { store } from "../../core/factories/store-factory";
// import { useCalendar } from "../../src/core/hooks/use-calendar";
// // import { useGridView } from "../../src/core/hooks/use-grid-view";

// const ALL_DAY_ITEMS = [
//   {
//     id: "all-day-1",
//     start_date: new Date(2025, 3, 1, 0, 0), // 1 de abril
//     end: new Date(2025, 3, 1, 23, 59), // Mesmo dia
//     title: "Conferência Anual",
//     allDay: true,
//   },
//   {
//     id: "all-day-2",
//     start_date: new Date(2025, 3, 2, 0, 0), // 2 de abril
//     end: new Date(2025, 3, 4, 23, 59), // 4 de abril (3 dias)
//     title: "Workshop de Desenvolvimento",
//     allDay: true,
//   },
//   {
//     id: "all-day-3",
//     start_date: new Date(2025, 3, 3, 0, 0), // 3 de abril
//     end: new Date(2025, 3, 3, 23, 59), // Mesmo dia
//     title: "Dia de Planejamento",
//     allDay: true,
//   },
//   {
//     id: "all-day-4",
//     start_date: new Date(2025, 3, 1, 0, 0), // 1 de abril
//     end: new Date(2025, 3, 2, 23, 59), // 2 de abril (2 dias)
//     title: "Projeto de Integração",
//     allDay: true,
//   },
//   {
//     id: "all-day-5", // ID único
//     start_date: new Date(2025, 3, 1, 0, 0), // 1 de abril
//     end: new Date(2025, 4, 15, 23, 59), // 15 de maio
//     title: "Evento que vai até maio",
//     allDay: true, // Explicitamente marcado como all day
//   },
// ];

// const ITEMS = [
//   ...ALL_DAY_ITEMS,
//   // Grupo 1: Eventos matutinos com sobreposição parcial
//   {
//     id: 1,
//     start_date: new Date(2025, 3, 1, 9, 0), // 9:00
//     title: "Morning Meeting",
//     category: "meeting",
//     end: new Date(2025, 3, 1, 10, 0), // 10:00 (longo)
//     description: "Team planning session",
//     location: "Conference Room A",
//   },
//   {
//     id: 3,
//     start_date: new Date(2025, 3, 1, 9, 0), // 9:00
//     title: "Project Review",
//     category: "meeting",
//     end: new Date(2025, 3, 1, 9, 30), // 9:30 (curto)
//     description: "Review quarterly progress",
//     location: "Conference Room B",
//   },

//   // Grupo 2: Eventos que começam quando outro termina
//   {
//     id: 32134,
//     start_date: new Date(2025, 3, 1, 9, 30), // 9:30 (começa quando id:2 termina)
//     title: "Client Call",
//     category: "call",
//     end: new Date(2025, 3, 1, 10, 0), // 10:00
//     description: "Client discussion",
//     location: "Phone",
//   },

//   // Grupo 3: Eventos no mesmo horário (10:00)
//   {
//     id: 4,
//     start_date: new Date(2025, 3, 1, 10, 0), // 10:00
//     title: "Strategy Session",
//     category: "meeting",
//     end: new Date(2025, 3, 1, 10, 45), // 10:45 (mais longo)
//     description: "Annual strategy planning",
//     location: "Boardroom",
//   },
//   {
//     id: 5,
//     start_date: new Date(2025, 3, 1, 10, 0), // 10:00
//     title: "Market Analysis",
//     category: "market",
//     end: new Date(2025, 3, 1, 10, 30), // 10:30
//     description: "Market review",
//     location: "Trading Desk",
//   },
//   // {
//   //   id: 131341,
//   //   start_date: new Date(2025, 3, 1, 10, 0), // 10:00
//   //   title: "Market Analysis",
//   //   category: "market",
//   //   end: new Date(2025, 3, 1, 10, 30), // 10:30
//   //   description: "Market review",
//   //   location: "Trading Desk",
//   // },
//   // {
//   //   id: 312,
//   //   start_date: new Date(2025, 3, 1, 10, 0), // 10:00
//   //   title: "Market Analysis",
//   //   category: "market",
//   //   end: new Date(2025, 3, 1, 10, 30), // 10:30
//   //   description: "Market review",
//   //   location: "Trading Desk",
//   // },
//   // {
//   //   id: 6,
//   //   start_date: new Date(2025, 3, 1, 10, 0), // 10:00
//   //   title: "Team Standup",
//   //   category: "meeting",
//   //   end: new Date(2025, 3, 1, 10, 15), // 10:15 (mais curto)
//   //   description: "Daily standup meeting",
//   //   location: "Zoom",
//   // },

//   // // Grupo 4: Eventos que começam quando outro termina
//   // {
//   //   id: 7,
//   //   start_date: new Date(2025, 3, 1, 10, 15), // 10:15 (começa quando id:6 termina)
//   //   title: "Code Review",
//   //   category: "development",
//   //   end: new Date(2025, 3, 1, 10, 45), // 10:45
//   //   description: "Review of new features",
//   //   location: "Development Room",
//   // },
//   // {
//   //   id: 8,
//   //   start_date: new Date(2025, 3, 1, 10, 15), // 10:15 (começa quando id:6 termina)
//   //   title: "Documentation",
//   //   category: "development",
//   //   end: new Date(2025, 3, 1, 10, 30), // 10:30
//   //   description: "Document updates",
//   //   location: "Development Room",
//   // },
//   // {
//   //   id: 9,
//   //   start_date: new Date(2025, 3, 1, 9, 45), // 14:00
//   //   title: "Afternoon Session",
//   //   category: "workshop",
//   //   end: new Date(2025, 3, 1, 10, 15), // 15:30
//   //   description: "Product workshop",
//   //   location: "Training Room",
//   // },
//   // {
//   //   id: 10,
//   //   start_date: new Date(2025, 3, 1, 10, 15), // 10:15 (começa quando id:6 termina)
//   //   title: "Documentation",
//   //   category: "development",
//   //   end: new Date(2025, 3, 1, 10, 30), // 10:30
//   //   description: "Document updates",
//   //   location: "Development Room",
//   // },
//   // {
//   //   id: 11,
//   //   start_date: new Date(2025, 3, 1, 10, 15), // 10:15 (começa quando id:6 termina)
//   //   title: "Documentation",
//   //   category: "development",
//   //   end: new Date(2025, 3, 1, 10, 30), // 10:30
//   //   description: "Document updates",
//   //   location: "Development Room",
//   // },
//   // {
//   //   id: 29,
//   //   start_date: new Date(2025, 3, 1, 10, 15), // 10:15 (começa quando id:6 termina)
//   //   title: "Documentation",
//   //   category: "development",
//   //   end: new Date(2025, 3, 1, 10, 30), // 10:30
//   //   description: "Document updates",
//   //   location: "Development Room",
//   // },
//   // {
//   //   id: 13,
//   //   start_date: new Date(2025, 3, 1, 9, 30), // 10:15 (começa quando id:6 termina)
//   //   title: "Documentation",
//   //   category: "development",
//   //   end: new Date(2025, 3, 1, 9, 45), // 10:30
//   //   description: "Document updates",
//   //   location: "Development Room",
//   // },
//   // {
//   //   id: 14,
//   //   start_date: new Date(2025, 3, 1, 9, 45), // 10:15 (começa quando id:6 termina)
//   //   title: "Documentation",
//   //   category: "development",
//   //   end: new Date(2025, 3, 1, 10, 0), // 10:30
//   //   description: "Document updates",
//   //   location: "Development Room",
//   // },
//   // {
//   //   id: 15,
//   //   start_date: new Date(2025, 3, 1, 9, 45), // 10:15 (começa quando id:6 termina)
//   //   title: "Documentation",
//   //   category: "development",
//   //   end: new Date(2025, 3, 1, 10, 0), // 10:30
//   //   description: "Document updates",
//   //   location: "Development Room",
//   // },
//   // {
//   //   id: 16,
//   //   start_date: new Date(2025, 3, 1, 9, 45), // 10:15 (começa quando id:6 termina)
//   //   title: "Documentation",
//   //   category: "development",
//   //   end: new Date(2025, 3, 1, 10, 0), // 10:30
//   //   description: "Document updates",
//   //   location: "Development Room",
//   // },
//   // {
//   //   id: 17,
//   //   start_date: new Date(2025, 3, 1, 9, 45), // 10:15 (começa quando id:6 termina)
//   //   title: "Documentation",
//   //   category: "development",
//   //   end: new Date(2025, 3, 1, 10, 0), // 10:30
//   //   description: "Document updates",
//   //   location: "Development Room",
//   // },
//   {
//     id: 20,
//     start_date: new Date(2025, 3, 1, 14, 0), // 14:00
//     title: "Afternoon Session",
//     category: "workshop",
//     end: new Date(2025, 4, 1, 15, 30), // 15:30
//     description: "Product workshop",
//     location: "Training Room",
//   },
//   {
//     id: 2011,
//     start_date: new Date(2025, 3, 1, 14, 0), // 14:00
//     title: "adsad Session",
//     category: "workshop",
//     end: new Date(2025, 5, 1, 15, 30), // 15:30
//     description: "Product workshop",
//     location: "Training Room",
//   },
// ];

// const meta = {
//   title: "Examples/GoogleCalendar",
//   component: GridView,
// } satisfies Meta<typeof GridView>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// export const Primary: Story = {
//   decorators: [
//     (Story) => (
//       <div className={styles["google-calendar-container"]}>
//         <Story />
//       </div>
//     ),
//   ],
//   render: () => {
//     useCalendar({
//       items: ITEMS,
//       config: { accessors: { start: "start_date" } },
//     });

//     // useGridView({
//     //   config: {
//     //     cell: { hour: { height: 48 } },
//     //   },
//     // });

//     return (
//       <Container className={styles["google-calendar-container"]}>
//         <Header className={styles["google-calendar-header"]}>
//           {({ days }) => (
//             <>
//               <CornerCell className={styles["google-calendar-corner-cell"]}>
//                 <div className={styles["google-calendar-corner-cell-text"]}>
//                   GMT+01
//                 </div>
//               </CornerCell>
//               {days.map((day, i) => (
//                 <DayCell
//                   className={styles["google-calendar-day-cell"]}
//                   key={i}
//                   day={day}
//                 >
//                   <DayCellWeekDay
//                     className={styles["google-calendar-day-cell-week-day"]}
//                   />
//                   <DayCellDay
//                     className={styles["google-calendar-day-cell-day"]}
//                   />
//                 </DayCell>
//               ))}
//             </>
//           )}
//         </Header>

//         <Body>
//           <HoursColumn>
//             {({ hours }) =>
//               hours.map((hour) => (
//                 <HourCell
//                   className={styles["google-calendar-hour-cell"]}
//                   key={hour}
//                   hour={hour}
//                 />
//               ))
//             }
//           </HoursColumn>

//           <TimeGrid>
//             {({ days, hours }) => (
//               <>
//                 {days.map((day) => (
//                   <TimeGridColumn key={day.toLocaleString()} day={day}>
//                     {hours.map((hour) => (
//                       <TimeGridCell key={hour} />
//                     ))}

//                     <ItemGroup rightReservedSpace={10} layout="default">
//                       {({ items }) =>
//                         items.map((item) => (
//                           <Item
//                             id={item.id}
//                             key={item.id}
//                             onClick={() => console.log("clicou nele")}
//                           >
//                             <ItemContent>
//                               <div className="font-medium">{item.title}</div>
//                               <div className="text-xs opacity-80">
//                                 {item.start_date.toString()}
//                                 {item.end.toString()}
//                               </div>
//                             </ItemContent>
//                           </Item>
//                         ))
//                       }
//                     </ItemGroup>

//                     <TimeGridSelection
//                       onSelectTime={(start, end) => console.log(start, end)}
//                     >
//                       <TimeGridSelectionArea />
//                     </TimeGridSelection>
//                   </TimeGridColumn>
//                 ))}
//                 <TimeMarker />
//               </>
//             )}
//           </TimeGrid>
//         </Body>
//       </Container>
//     );
//   },
// };
//
const meta = {
  title: 'Examples/GoogleCalendar',
  component: <></>,
};

export default meta;

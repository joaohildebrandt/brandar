import type { Meta, StoryObj } from "@storybook/react";
import { Fragment, useState } from "react";

import { Calendar, GridView, useCalendar, useGridView } from "../../../src";
import styles from "./styles.module.css";
import { ITEMS } from "../../data/items";

const meta = {
  title: "Themes/Google Calendar",
  component: GridView.Root,
} satisfies Meta<typeof GridView.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    backgrounds: {
      light: {
        value: "#a8c7fa",
      },
    },
  },

  decorators: [
    (Story) => {
      return (
        <Calendar>
          <Story />
        </Calendar>
      );
    },
  ],
  render: () => {
    const [items, setItems] = useState(ITEMS);
    // Implement a getState
    useCalendar({
      items,
      config: { accessors: { start: "start_date" } },
    });

    useGridView({ cell: { hour: { height: 48 } } });

    return (
      <GridView.Root>
        <GridView.Container className={styles.gridViewContainer}>
          <GridView.Header className={styles.gridViewHeader}>
            {({ days }) => (
              <Fragment>
                <GridView.CornerCell className={styles.gridViewCornerCell} />
                {days.map((day, i) => (
                  <GridView.DayCell
                    key={i}
                    day={day}
                    className={styles.gridViewDayCell}
                  >
                    <GridView.DayCellWeekDay
                      className={styles.gridViewDayCellWeekDay}
                    />
                    <GridView.DayCellDay
                      className={styles.gridViewDayCellDay}
                    />
                  </GridView.DayCell>
                ))}
              </Fragment>
            )}
          </GridView.Header>

          <GridView.AllDay>
            {({ days }) => (
              <Fragment>
                <GridView.CornerCell className="flex items-center justify-center text-xs text-gray-500">
                  all day
                </GridView.CornerCell>

                <GridView.AllDayBody>
                  <GridView.AllDayItemGroup>
                    {({ items }) => (
                      <Fragment>
                        {items.map((item) => (
                          <GridView.AllDayItem
                            id={item.id}
                            key={item.id}
                            className="bg-indigo-100 border-indigo-300 hover:bg-indigo-200 cursor-pointer"
                          >
                            <div className="font-medium truncate">
                              {item.title}
                            </div>
                          </GridView.AllDayItem>
                        ))}
                      </Fragment>
                    )}
                  </GridView.AllDayItemGroup>
                </GridView.AllDayBody>
              </Fragment>
            )}
          </GridView.AllDay>

          <GridView.Body>
            <GridView.HoursColumn className={styles.gridViewHoursColumn}>
              {({ hours }) =>
                hours.map((hour) => (
                  <GridView.HourCell
                    className={styles.gridViewHourCell}
                    key={hour}
                    hour={hour}
                  />
                ))
              }
            </GridView.HoursColumn>

            <GridView.TimeGrid>
              {({ days, hours }) => (
                <Fragment>
                  {days.map((day) => (
                    <GridView.TimeGridColumn
                      key={day.toLocaleString()}
                      day={day}
                      className={styles.gridViewTimeGridColumn}
                    >
                      {hours.map((hour) => (
                        <GridView.TimeGridCell
                          className={styles.gridViewTimeGridCell}
                          key={hour}
                        />
                      ))}

                      <GridView.ItemGroup>
                        {({ items }) =>
                          items.map((item) => (
                            <GridView.Item
                              id={item.id}
                              key={item.id}
                              onClick={() => console.log("clicou nele")}
                              className={styles.gridViewItem}
                            >
                              <GridView.ItemContent>
                                <div
                                  className={
                                    styles.gridViewItemContentItemTitle
                                  }
                                >
                                  {item.title}
                                </div>
                                <div className="text-xs opacity-80">
                                  {item.start_date.toString()}
                                  {item.end.toString()}
                                </div>
                              </GridView.ItemContent>
                            </GridView.Item>
                          ))
                        }
                      </GridView.ItemGroup>

                      {/* <TimeGridSelection
                        onSelectTime={(start, end) => console.log(start, end)}
                      >
                        <TimeGridSelectionArea />
                      </TimeGridSelection> */}
                    </GridView.TimeGridColumn>
                  ))}
                  {/*<GridView.TimeMarker />*/}
                </Fragment>
              )}
            </GridView.TimeGrid>
          </GridView.Body>
        </GridView.Container>
      </GridView.Root>
    );
  },
};

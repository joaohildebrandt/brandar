import type { Meta, StoryObj } from "@storybook/react";
import { Fragment, useState } from "react";

import { Calendar, GridView, useCalendar } from "../../src";

import { ITEMS } from "../data/items";

const meta = {
  title: "Calendar - Grid View",
  component: GridView.Root,
} satisfies Meta<typeof GridView.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
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
    const [items, setItems] = useState([]);
    // Implement a getState
    const {
      nextPeriod,
      previousPeriod,
      goToPreviousPeriod,
      goToNextPeriod,
      setPeriod,
      goToToday,
    } = useCalendar({
      items,
      config: { accessors: { start: "start_date" } },
    });

    const onPreviousPeriodClick = () => {
      goToPreviousPeriod();
    };

    const onNextPeriodClick = () => {
      goToNextPeriod();
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div>
          <button type="button" onClick={() => onPreviousPeriodClick()}>
            previous
          </button>
          <button type="button" onClick={() => onNextPeriodClick()}>
            next
          </button>
          <button
            type="button"
            onClick={() => setPeriod({ period: 1, type: "day" })}
          >
            define
          </button>
          <button
            type="button"
            onClick={() => {
              goToToday(true);
            }}
          >
            today
          </button>
        </div>

        <GridView.Root>
          <GridView.Container style={{ height: "100%" }}>
            <GridView.Header>
              {({ days }) => (
                <Fragment>
                  <GridView.CornerCell />
                  {days.map((day, i) => (
                    <GridView.DayCell key={i} day={day}>
                      <GridView.DayCellWeekDay />
                      <GridView.DayCellDay />
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

            <GridView.Body style={{ flex: 1 }}>
              <GridView.HoursColumn>
                {({ hours }) =>
                  hours.map((hour) => (
                    <GridView.HourCell key={hour} hour={hour} />
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
                      >
                        {hours.map((hour) => (
                          <GridView.TimeGridCell key={hour} />
                        ))}

                        <GridView.ItemGroup>
                          {({ items }) =>
                            items.map((item) => (
                              <GridView.Item
                                id={item.id}
                                key={item.id}
                                onClick={() => console.log("clicou nele")}
                              >
                                <GridView.ItemContent>
                                  <div className="font-medium">
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
                    <GridView.TimeMarker />
                  </Fragment>
                )}
              </GridView.TimeGrid>
            </GridView.Body>
          </GridView.Container>
        </GridView.Root>
      </div>
    );
  },
};

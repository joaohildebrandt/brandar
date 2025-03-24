import { Fragment, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Container } from "../../src/grid-view/components/container/container";
import { Header } from "../../src/grid-view/components/header/header";
import { CornerCell } from "../../src/grid-view/components/corner-cell/corner-cell";
import {
  DayCell,
  DayCellDay,
  DayCellWeekDay,
} from "../../src/grid-view/components/day-cell/day-cell";
import { Body } from "../../src/grid-view/components/body/body";
import { HoursColumn } from "../../src/grid-view/components/hours-column/hours-column";
import { TimeGrid } from "../../src/grid-view/components/time-grid/time-grid";
import { TimeGridColumn } from "../../src/grid-view/components/time-grid-column/time-grid-column";
import { TimeGridCell } from "../../src/grid-view/components/time-grid-cell/time-grid-cell";
import { ItemGroup } from "../../src/grid-view/components/item-group/item-group";
import { Item } from "../../src/grid-view/components/item/item";
import { ItemContent } from "../../src/grid-view/components/item-content/item-content";
import { TimeMarker } from "../../src/grid-view/components/time-marker/time-marker";
import { HourCell } from "../../src/grid-view/components/hour-cell/hour-cell";
import { AllDay } from "../../src/grid-view/components/all-day/all-day";
import { AllDayItem } from "../../src/grid-view/components/all-day-item/all-day-item";
import { AllDayItemGroup } from "../../src/grid-view/components/all-day-item-group/all-day-item-group";
import { AllDayBody } from "../../src/grid-view/components/all-day-body/all-day-body";
import { Calendar } from "../../src/core/components/calendar";
import { GridView } from "../../src/grid-view/components/grid-view/grid-view";
import { useCalendar } from "../../src/core/hooks/use-calendar";
import {
  generateNextItems,
  generatePreviousItems,
  ITEMS,
  NEXT_ITEMS,
  PREVIOUS_ITEMS,
} from "../data/items";
import { generatePreviousPeriod } from "../../core/helpers/calendar";

const meta = {
  title: "Calendar - Grid View",
  component: GridView,
} satisfies Meta<typeof GridView>;

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
    const [items, setItems] = useState(ITEMS);
    // Implement a getState
    const {
      nextPeriod,
      previouPeriod,
      goToPreviousPeriod,
      goToNextPeriod,
      setPeriod,
      goToToday,
    } = useCalendar({
      items,
      config: { accessors: { start: "start_date" } },
    });

    const onPreviousPeriodClick = () => {
      console.log(previouPeriod.start);
      console.log(generatePreviousItems(previouPeriod.start));
      goToPreviousPeriod();
      setItems(generatePreviousItems(previouPeriod.start));
    };

    const onNextPeriodClick = () => {
      goToNextPeriod();
      setItems(generateNextItems(nextPeriod.start));
    };

    return (
      <GridView>
        <button type="button" onClick={() => onPreviousPeriodClick()}>
          previous
        </button>
        <button type="button" onClick={() => onNextPeriodClick()}>
          next
        </button>
        <button
          type="button"
          onClick={() => setPeriod({ period: 1, type: "week" })}
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
        <Container
          style={{
            height: "calc(100vh - 130px)",
          }}
        >
          <Header>
            {({ days }) => (
              <Fragment>
                <CornerCell />
                {days.map((day, i) => (
                  <DayCell key={i} day={day}>
                    <DayCellWeekDay />
                    <DayCellDay />
                  </DayCell>
                ))}
              </Fragment>
            )}
          </Header>

          <AllDay>
            {({ days }) => (
              <Fragment>
                <CornerCell className="flex items-center justify-center text-xs text-gray-500">
                  all day
                </CornerCell>

                <AllDayBody>
                  <AllDayItemGroup>
                    {({ items }) => (
                      <Fragment>
                        {items.map((item) => (
                          <AllDayItem
                            id={item.id}
                            key={item.id}
                            className="bg-indigo-100 border-indigo-300 hover:bg-indigo-200 cursor-pointer"
                          >
                            <div className="font-medium truncate">
                              {item.title}
                            </div>
                          </AllDayItem>
                        ))}
                      </Fragment>
                    )}
                  </AllDayItemGroup>
                </AllDayBody>
              </Fragment>
            )}
          </AllDay>

          <Body>
            <HoursColumn>
              {({ hours }) =>
                hours.map((hour) => <HourCell key={hour} hour={hour} />)
              }
            </HoursColumn>

            <TimeGrid>
              {({ days, hours }) => (
                <Fragment>
                  {days.map((day) => (
                    <TimeGridColumn key={day.toLocaleString()} day={day}>
                      {hours.map((hour) => (
                        <TimeGridCell key={hour} />
                      ))}

                      <ItemGroup>
                        {({ items }) =>
                          items.map((item) => (
                            <Item
                              id={item.id}
                              key={item.id}
                              onClick={() => console.log("clicou nele")}
                            >
                              <ItemContent>
                                <div className="font-medium">{item.title}</div>
                                <div className="text-xs opacity-80">
                                  {item.start_date.toString()}
                                  {item.end.toString()}
                                </div>
                              </ItemContent>
                            </Item>
                          ))
                        }
                      </ItemGroup>

                      {/* <TimeGridSelection
                        onSelectTime={(start, end) => console.log(start, end)}
                      >
                        <TimeGridSelectionArea />
                      </TimeGridSelection> */}
                    </TimeGridColumn>
                  ))}
                  <TimeMarker />
                </Fragment>
              )}
            </TimeGrid>
          </Body>
        </Container>
      </GridView>
    );
  },
};

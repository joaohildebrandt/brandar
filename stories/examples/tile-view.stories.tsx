import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "../../src/core/components/calendar";
import { TileView } from "../../src/tile-view/components/tile-view/tile-view";
import { TileGrid } from "../../src/tile-view/components/tile-grid/tile-grid";
import { TileGridCell } from "../../src/tile-view/components/tile-grid-cell/tile-grid-cell";
import { useCalendar } from "../../src/core/hooks/use-calendar";
import { ITEMS, NEXT_ITEMS, PREVIOUS_ITEMS } from "../data/items";

const meta = {
  title: "Calendar - Tile View",
  component: TileView,
} satisfies Meta<typeof TileView>;

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
    const { goToPreviousPeriod, goToNextPeriod, setPeriod, goToToday } =
      useCalendar({
        items,
        config: { accessors: { start: "start_date" } },
      });

    const onPreviousPeriodClick = () => {
      goToPreviousPeriod();
      setItems(PREVIOUS_ITEMS);
    };

    const onNextPeriodClick = () => {
      goToNextPeriod();
      setItems(NEXT_ITEMS);
    };

    return (
      <TileView>
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

        <TileGrid>
          <TileGridCell />
          <TileGridCell />
          <TileGridCell />
          <TileGridCell />
          <TileGridCell />
          <TileGridCell />
          <TileGridCell />
        </TileGrid>
      </TileView>
    );
  },
};

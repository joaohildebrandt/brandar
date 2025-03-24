import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Calendar } from '../../src/core/components/calendar';
import { useCalendar } from '../../src/core/hooks/use-calendar';
import { GridCell } from '../../src/tile-view/components/grid-cell/grid-cell';
import { Grid } from '../../src/tile-view/components/grid/grid';
import { Header } from '../../src/tile-view/components/header/header';
import { View } from '../../src/tile-view/components/view/view';
import { ITEMS } from '../data/items';

const meta = {
  title: 'Calendar - Tile View',
  component: View,
} satisfies Meta<typeof View>;

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
        period: {
          period: 1,
          type: 'month',
        },
        items,
        config: { accessors: { start: 'start_date' } },
      });

    const onPreviousPeriodClick = () => {
      goToPreviousPeriod();
    };

    const onNextPeriodClick = () => {
      goToNextPeriod();
    };

    return (
      <>
        <button type="button" onClick={() => onPreviousPeriodClick()}>
          previous
        </button>
        <button type="button" onClick={() => onNextPeriodClick()}>
          next
        </button>
        <button
          type="button"
          onClick={() => setPeriod({ period: 1, type: 'week' })}
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
        <View>
          <Header>
            {({ week }) => (
              <>
                {week.map((value) => (
                  <GridCell key={value}>{value}</GridCell>
                ))}
              </>
            )}
          </Header>
          <Grid>
            {({ days }) => (
              <>
                {days.map((day) => (
                  <GridCell key={day.toDateString()}>{day.getDate()}</GridCell>
                ))}
              </>
            )}
          </Grid>
        </View>
      </>
    );
  },
};

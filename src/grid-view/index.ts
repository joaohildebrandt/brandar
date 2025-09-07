// All Day
import { AllDayBody } from "./components/all-day-body/all-day-body";
import { AllDayCell } from "./components/all-day-cell/all-day-cell";
import { AllDayItemGroup } from "./components/all-day-item-group/all-day-item-group";
import { AllDayItem } from "./components/all-day-item/all-day-item";
import { AllDay } from "./components/all-day/all-day";
import { Body, BodyWrapper } from "./components/body/body";
import { Container } from "./components/container/container";
// Header
import { CornerCell } from "./components/corner-cell/corner-cell";
import {
  DayCell,
  DayCellDay,
  DayCellWeekDay,
} from "./components/day-cell/day-cell";
import { Header } from "./components/header/header";
import { HourCell } from "./components/hour-cell/hour-cell";
// Hours
import { HoursColumn } from "./components/hours-column/hours-column";
import { ItemContent } from "./components/item-content/item-content";
// Item
import { ItemGroup } from "./components/item-group/item-group";
import { Item } from "./components/item/item";
import { TimeGridCell } from "./components/time-grid-cell/time-grid-cell";
import { TimeGridColumn } from "./components/time-grid-column/time-grid-column";
// Time Grid
import { TimeGrid } from "./components/time-grid/time-grid";
import { TimeMarker } from "./components/time-marker/time-marker";
import { View } from "./components/view/view";

export const GridView = {
  Root: View,
  BodyWrapper,
  Body,
  Container,
  // All Day
  AllDay,
  AllDayBody,
  AllDayCell,
  AllDayItemGroup,
  AllDayItem,
  // Header
  Header,
  CornerCell,
  DayCell,
  DayCellDay,
  DayCellWeekDay,
  // Hours
  HoursColumn,
  HourCell,
  // Item
  ItemGroup,
  Item,
  ItemContent,
  // Time Grid
  TimeGrid,
  TimeGridCell,
  TimeGridColumn,
  TimeMarker,
};

import { addDays, set, startOfWeek, subDays } from 'date-fns';

const today = new Date();
const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 }); // Domingo como início da semana

export const ALL_DAY_ITEMS = [
  {
    id: 'all-day-1',
    start_date: startOfCurrentWeek, // Início da semana atual
    end: addDays(startOfCurrentWeek, 0), // Mesmo dia
    title: 'Conferência Anual',
    allDay: true,
  },
  {
    id: 'all-day-2',
    start_date: addDays(startOfCurrentWeek, 1), // Segunda-feira desta semana
    end: addDays(startOfCurrentWeek, 3), // Quarta-feira desta semana
    title: 'Workshop de Desenvolvimento',
    allDay: true,
  },
  {
    id: 'all-day-3',
    start_date: addDays(startOfCurrentWeek, 2), // Terça-feira desta semana
    end: addDays(startOfCurrentWeek, 2), // Mesmo dia
    title: 'Dia de Planejamento',
    allDay: true,
  },
  {
    id: 'all-day-4',
    start_date: startOfCurrentWeek, // Início da semana atual
    end: addDays(startOfCurrentWeek, 1), // Segunda-feira desta semana
    title: 'Projeto de Integração',
    allDay: true,
  },
  {
    id: 'all-day-5',
    start_date: startOfCurrentWeek, // Início da semana atual
    end: addDays(startOfCurrentWeek, 5), // Sexta-feira desta semana
    title: 'Evento que vai até o final da semana',
    allDay: true,
  },
];

export const ITEMS = [
  ...ALL_DAY_ITEMS,
  {
    id: 1,
    start_date: set(addDays(startOfCurrentWeek, 0), { hours: 9, minutes: 0 }), // Domingo às 9:00
    title: 'Morning Meeting',
    category: 'meeting',
    end: set(addDays(startOfCurrentWeek, 0), { hours: 10, minutes: 0 }), // Domingo às 10:00
    description: 'Team planning session',
    location: 'Conference Room A',
  },
  {
    id: 5,
    start_date: set(addDays(startOfCurrentWeek, 0), { hours: 9, minutes: 0 }), // Domingo às 9:00
    title: 'Morning Meeting',
    category: 'meeting',
    end: set(addDays(startOfCurrentWeek, 0), { hours: 10, minutes: 0 }), // Domingo às 10:00
    description: 'Team planning session',
    location: 'Conference Room A',
  },
  {
    id: 9,
    start_date: set(addDays(startOfCurrentWeek, 0), { hours: 9, minutes: 0 }), // Domingo às 9:00
    title: 'Morning Meeting',
    category: 'meeting',
    end: set(addDays(startOfCurrentWeek, 0), { hours: 10, minutes: 30 }), // Domingo às 10:00
    description: 'Team planning session',
    location: 'Conference Room A',
  },
  {
    id: 12,
    start_date: set(addDays(startOfCurrentWeek, 0), { hours: 9, minutes: 0 }), // Domingo às 9:00
    title: 'Morning Meeting',
    category: 'meeting',
    end: set(addDays(startOfCurrentWeek, 0), { hours: 9, minutes: 30 }), // Domingo às 10:00
    description: 'Team planning session',
    location: 'Conference Room A',
  },
  {
    id: 16,
    start_date: set(addDays(startOfCurrentWeek, 0), { hours: 9, minutes: 30 }), // Domingo às 9:00
    title: 'Morning Meeting',
    category: 'meeting',
    end: set(addDays(startOfCurrentWeek, 0), { hours: 10, minutes: 0 }), // Domingo às 10:00
    description: 'Team planning session',
    location: 'Conference Room A',
  },
  {
    id: 26,
    start_date: set(addDays(startOfCurrentWeek, 0), { hours: 9, minutes: 30 }), // Domingo às 9:00
    title: 'Morning Meeting',
    category: 'meeting',
    end: set(addDays(startOfCurrentWeek, 0), { hours: 10, minutes: 30 }), // Domingo às 10:00
    description: 'Team planning session',
    location: 'Conference Room A',
  },
  {
    id: 2,
    start_date: set(addDays(startOfCurrentWeek, 1), { hours: 10, minutes: 0 }), // Segunda-feira às 10:00
    title: 'Morning Meeting',
    category: 'meeting',
    end: set(addDays(startOfCurrentWeek, 1), { hours: 10, minutes: 30 }), // Segunda-feira às 10:30
    description: 'Team planning session',
    location: 'Conference Room A',
  },
  {
    id: 3,
    start_date: set(addDays(startOfCurrentWeek, 2), { hours: 9, minutes: 0 }), // Terça-feira às 9:00
    title: 'Project Review',
    category: 'meeting',
    end: set(addDays(startOfCurrentWeek, 2), { hours: 9, minutes: 30 }), // Terça-feira às 9:30
    description: 'Review quarterly progress',
    location: 'Conference Room B',
  },
];

export const generateNextItems = (date: Date) => {
  return [
    {
      id: 13233,
      start_date: set(addDays(date, 0), { hours: 9, minutes: 0 }), // Domingo da próxima semana às 9:00
      title: 'Morning Meeting',
      category: 'meeting',
      end: set(addDays(date, 0), { hours: 10, minutes: 0 }), // Domingo da próxima semana às 10:00
      description: 'Team planning session',
      location: 'Conference Room A',
    },
    {
      id: 21321312,
      start_date: set(addDays(date, 1), { hours: 2, minutes: 0 }), // Segunda-feira da próxima semana às 10:00
      title: 'Morning Meeting',
      category: 'meeting',
      end: set(addDays(date, 1), { hours: 2, minutes: 30 }), // Segunda-feira da próxima semana às 10:30
      description: 'Team planning session',
      location: 'Conference Room A',
    },
    {
      id: 21321313,
      start_date: set(addDays(date, 1), { hours: 2, minutes: 0 }), // Segunda-feira da próxima semana às 10:00
      title: 'Morning Meeting',
      category: 'meeting',
      end: set(addDays(date, 1), { hours: 2, minutes: 30 }), // Segunda-feira da próxima semana às 10:30
      description: 'Team planning session',
      location: 'Conference Room A',
    },
  ];
};

export const generatePreviousItems = (date: Date) => {
  return [
    {
      id: 13233222,
      start_date: set(addDays(date, 0), {
        hours: 9,
        minutes: 0,
      }), // Domingo da semana passada às 9:00
      title: 'Morning Meeting',
      category: 'meeting',
      end: set(addDays(date, 0), { hours: 10, minutes: 0 }), // Domingo da semana passada às 10:00
      description: 'Team planning session',
      location: 'Conference Room A',
    },
    {
      id: 21321312333,
      start_date: set(addDays(date, 1), {
        hours: 10,
        minutes: 0,
      }), // Segunda-feira da semana passada às 10:00
      title: 'Morning Meeting',
      category: 'meeting',
      end: set(addDays(date, 1), { hours: 10, minutes: 30 }), // Segunda-feira da semana passada às 10:30
      description: 'Team planning session',
      location: 'Conference Room A',
    },
  ];
};

import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarMonthViewDay, CalendarEventAction } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
  addDays,
  addWeeks,
  addMonths,
  subDays,
  subWeeks,
  subMonths
} from 'date-fns';
import { Observable } from 'rxjs';
import { MeetingService } from '../services/meeting.service';

type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth
  }[period](date);
}

interface Film {
  id: number;
  title: string;
  release_date: string;
}

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';
  return `T00:00:00${direction}${hoursOffset}${minutesOffset}`;
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'user-home.component.html',
  styleUrls: ['user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  view: CalendarPeriod = 'month';

  prevBtnDisabled: boolean = false;

  nextBtnDisabled: boolean = false;

  viewDate: Date = new Date();

  events$: Observable<Array<CalendarEvent>>;

  activeDayIsOpen: boolean = false;

  minDate: Date = subMonths(new Date(), 0);

  maxDate: Date = addMonths(new Date(), 12);

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event)
      }
    }
  ];

  constructor(private meetingService: MeetingService) {
    this.dateOrViewChanged();
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    this.events$ = this.meetingService.getAllMeetings()
      .pipe(
        map((results) => {
          let datas = results;
          let meeting = datas['data']
          
          return meeting.map((meeting) => {
            return {
              id: meeting.meetingId,
              adminId: meeting.adminId,
              userId: meeting.userId,
              title: meeting.meetingTitle,
              start: new Date(
                meeting.startDate
              ),
              end: new Date(meeting.endDate),
              actions: this.actions
            };
          });
        })
      );
  }

  dayClicked({
    date,
    events
  }: {
    date: Date;
    events: Array<CalendarEvent<{ film: Film }>>;
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent): void {
    console.log(event)
  }


  increment(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarPeriod): void {
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }
}
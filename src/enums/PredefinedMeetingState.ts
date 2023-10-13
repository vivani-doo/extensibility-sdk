/**
 * List of states in which meeting can be
 * during the lifetime of the meeting in which
 * addon is loaded.
 *
 * @export
 * @enum {number}
 */
export enum PredefinedMeetingState {
  UNDEFINED = 0,

  MEETING_DRAFT,
  MEETING_CREATED,
  MEETING_CANCELED,
  MEETING_ARCHIVED,
  MEETING_REACTIVATED,

  SCHEDULING_STARTED = 10,
  SCHEDULING_TIME,
  SCHEDULING_FAILED,
  SCHEDULING_COMPLETED,

  MEETING_STARTED = 20,
  MEETING_FAILED,
  MEETING_STOPPED,

  BILLABLE_STARTED = 30,
  BILLABLE_STOPPED,

  MEETING_COMPLETED = 40,
  FEEDBACK_COLLECTING,
  FEEDBACK_FAILED,
  FEEDBACK_COMPLETED,
}

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { RxPubSub } from 'rx-pubsub'
let hash = require('object-hash/index.js');

/**
 * PubSub service based on RxJs ReplaySubject https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/replaysubject.md
 */
export class PubSubDistinct extends RxPubSub {

  /**
   * Publish data to an event
   * @param eventName Event which should be fired
   * @param data Data sent to all Subscribers of the event
   * @param previousMessagesNr Maximum element count of the replay buffer
   * @param saveHash Boolean should the hash be saved for the current push operation or not. By default is false - hash is not saved
   */
  static publish(eventName: string, data: any, previousMessagesNr: number = 1, saveHash: boolean = false): void {
    if (saveHash) {
      let hash = this.getDataHash(data);
      this.setHashToEvent(eventName, hash);
    }

    let subject = this.getSubjectByEventName(eventName, previousMessagesNr);
    //push data to subscriptions/subscribers
    subject.next(data);
  }

  /**
   * Publish distinct data to an event.
   * It will NOT publish the same data twice in a row to the same event
   * @param eventName Event which should be fired
   * @param data Data sent to all Subscribers of the event
   * @param previousMessagesNr Maximum element count of the replay buffer
   */
  static publishDistinct(eventName: string, data: any, previousMessagesNr: number = 1): void {
    let hash = this.getDataHash(data);
    let subject = this.getSubjectByEventName(eventName, previousMessagesNr);
    let eventHash = this.getEventHash(eventName);
    // push data to subscriptions/subscribers only if the data is different from the previous pushed data
    if (!eventHash || eventHash !== hash) {
      this.setHashToEvent(eventName, hash);
      //push data to subscriptions/subscribers
      subject.next(data);
    }
  }

  /**
   * Create RxJs ReplaySubject for the specified eventName
   * @param eventName Name of the event to which to attach the ReplaySubject object
   * @param previousMessagesNr Maximum element count of the replay buffer
   * @returns {any}
   */
  static getSubjectByEventName(eventName: string, previousMessagesNr: number = 1): ReplaySubject<any> {
    // create new Subject if there is not such thing for the specified eventName
    if (!this.events[eventName]) {
      this.events[eventName] = {
        subject: new ReplaySubject(previousMessagesNr),
        dataHash: null
      };
    }

    return this.events[eventName].subject;
  }

  /**
   * Attach a hash string to an event from the `events` list
   * @param eventName
   * @param dataHash
   */
  static setHashToEvent(eventName: string, dataHash: string): void {
    if (this.events[eventName]) {
      this.events[eventName].dataHash = dataHash;
    }
  }

  /**
   * Retrieves teh hash attached to an event
   * @param eventName Event name
   * @returns {string|boolean} Returns string if there is an event and it has a hash attached to it. FALSE - otherwise
   */
  static getEventHash(eventName: string): string | boolean {
    if (this.events[eventName]) {
      return this.events[eventName].dataHash;
    }

    return false;
  }

  /**
   * Generates the hash for the specified data.
   * @param data Data required to generate the hash
   * @returns {string}
   */
  static getDataHash(data: any): string {
    return hash.sha1(data);
  }
}

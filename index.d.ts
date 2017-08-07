// Type definitions for PubSubDistinct
// Project: PubSubDistinct
// Definitions by: tomsa.md


/*~ If this module is a UMD module that exposes a global variable 'myClassLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */

import {ReplaySubject} from 'rxjs/ReplaySubject'
import {Subscription} from 'rxjs/Subscription';

/*~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */

declare class PubSubDistinct {
    protected events: any;

    public publish(eventName: string, data: any, previousMessagesNr?: number, saveHash?: boolean): PubSubDistinct;

    public publishDistinct(eventName: string, data: any, previousMessagesNr?: number): PubSubDistinct;

    public subscribe(eventName: string, callback: (data?: any) => any, previousMessagesNr?: number): Subscription;

    public subscribeOnce(eventName: string, callback: (data?: any) => any): Subscription|boolean;

    public unsubscribe(subscriber: any): PubSubDistinct;

    public unsubscribeAll(subscribers: Subscription[]): PubSubDistinct;

    public dispose(eventName: string): PubSubDistinct;

    public hasSubscribers(eventName: string): boolean;

    public getEvents(): any;

    public getSubjects(): any;

    protected getSubjectByEventName(eventName: string, previousMessagesNr: number): ReplaySubject<any>;

    protected isCallback(callback: (data?: any) => any): boolean;

    protected setHashToEvent(eventName: string, dataHash: string): PubSubDistinct;

    protected getEventHash(eventName: string): string|boolean;

    protected getDataHash(data: any): string;
}

export {PubSubDistinct, Subscription};

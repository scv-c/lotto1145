import {EventEmitter} from "events"

class MyEventEmitter extends EventEmitter {
    emit(event, ...args) {
        //확장 가능성을 열어둠. 로그찍을때 쓸 것.
        
        return super.emit(event, ...args);
    }
}
export const myEventEmitter = new MyEventEmitter();
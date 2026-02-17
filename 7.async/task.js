class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (time === undefined || time === null || callback === undefined) {
      throw new Error("Ошибка! Отсутствуют необходимые параметры");
    }

    const existingAlarm = this.alarmCollection.find(
      (alarm) => alarm.time === time,
    );
    if (existingAlarm) {
      console.warn("Уже есть будильник в это же время");
    }

    this.alarmCollection.push({
      time,
      callback,
      canCall: true,
    });
  }

  removeClock(time) {
    const initialLength = this.alarmCollection.length;
    this.alarmCollection = this.alarmCollection.filter(
      (alarm) => alarm.time !== time,
    );
    return initialLength !== this.alarmCollection.length;
  }

  getCurrentFormattedTime() {
    return new Date().toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  start() {
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();

      this.alarmCollection.forEach((alarm) => {
        if (alarm.time === currentTime && alarm.canCall) {
          alarm.canCall = false;
          alarm.callback();
        }
      });
    }, 1000);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAllCalls() {
    this.alarmCollection.forEach((alarm) => {
      alarm.canCall = true;
    });
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}

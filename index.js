const ProjectModule = (function () {
  const project = {
    participants: [],
    pricing: {},
    isBusy: false,

    /* implement initialization of the object */
    /* participants - predefined array of participants */
    /* pricing - predefined object (keyvalue collection) of pricing */
    init(participants, pricing) {
      if (!(participants instanceof Array) || !(pricing instanceof Object)) return;
      this.participants = participants;
      this.pricing = pricing;
    },

    /* pass found participant into callback, stops on first match */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with found participant as argument or with null if not */
    /* callbackFunction (participant) => {} */
    findParticipant(functor, callbackFunction) {
      this.isBusy = true;
      setTimeout(() => {
        this.isBusy = false;
        const participant = this.participants.find(functor);
        callbackFunction(participant !== undefined ? participant : null);
      });
    },

    /* pass array of found participants into callback */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with array of found participants as argument or empty array if not */
    /* callbackFunction (participantsArray) => {} */
    findParticipants(functor, callbackFunction) {
      this.isBusy = true;
      setTimeout(() => {
        this.isBusy = false;
        const participants = [];
        this.participants.forEach(participant => {
          if (functor(participant)) participants.push(participant);
        });
        callbackFunction(participants);
      });
    },

    /* push new participant into this.participants array */
    /* callbackFunction - function that will be executed when job will be done */
    /* (err) => {} */
    addParticipant(participantObject, callbackFunction) {
      this.isBusy = true;
      setTimeout(() => {
        this.isBusy = false;
        if (participantObject.hasOwnProperty('seniorityLevel')) {
          this.participants.push(participantObject);
          callbackFunction();
        } else {
          callbackFunction({err: 'Error!!! Seniority Level is required!'});
        }
      });
    },

    /* push new participant into this.participants array */
    /* callback should receive removed participant */
    /* callbackFunction - function that will be executed with object of removed participant or null if participant wasn't found when job will be done */
    removeParticipant(participantObject, callbackFunction) {
      this.isBusy = true;
      setTimeout(() => {
        this.isBusy = false;
        const index = this.participants.indexOf(participantObject);
        if (index == -1) {
          callbackFunction(null);
        } else {
          this.participants.splice(index, 1);
          callbackFunction(participantObject);
        }
      });
    },

    /* Extends this.pricing with new field or change existing */
    /* callbackFunction - function that will be executed when job will be done, doesn't take any arguments */
    setPricing(participantPriceObject, callbackFunction) {
      this.isBusy = true;
      setTimeout(() => {
        this.isBusy = false;
        this.pricing = participantPriceObject;
        callbackFunction();
      });
    },

    /* calculates salary of all participants in the given period */
    /* periodInDays, has type number, one day is equal 8 working hours */
    calculateSalary(periodInDays) {
      let salary = 0;
      this.participants.forEach(participant => {
        const hourSalary = this.pricing[participant.seniorityLevel];
        if (hourSalary) {
          salary += hourSalary * 8 * periodInDays;
        } else {
          throw new Error(`Pricing wasn\'t found`);
        }
      });
      return salary;
    }
  };

  return {
    getInstance: function() {
      return project;
    }
  }
})();

module.exports = {
  firstName: 'Kateryna',
  secondName: 'Marchenko',
  task: ProjectModule
};

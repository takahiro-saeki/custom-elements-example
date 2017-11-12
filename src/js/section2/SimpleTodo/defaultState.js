import uuid from 'uuid';

const defaultState = [
  {
    uuid: uuid.v4(),
    isDisabled: false,
    text: 'text content.',
    isCompleted: false
  },
  {
    uuid: uuid.v4(),
    isDisabled: true,
    text: 'dummy text.',
    isCompleted: true
  },
  {
    uuid: uuid.v4(),
    isDisabled: false,
    text: 'mock text.',
    isCompleted: false
  }
];

export default defaultState;

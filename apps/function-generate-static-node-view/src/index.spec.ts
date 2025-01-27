import { functionGenerateStaticNodeView } from "./index";
import { inspect } from 'util';

function pubSubEvent(obj) {
  return {
    data: Buffer.from(JSON.stringify(obj)).toString('base64')
  }
}

describe('function-generate-static-node-view', () => {
  it('function-generate-static-node-view: should return {value: "Hello World"}', async () => {
    // Initialize mocks
    // Call tested function and verify its behavior
    const event = pubSubEvent({value: 'Hello World'});
    const testResult = await pubsubService(event, null);
    console.log(inspect(testResult, false, null));
    expect(testResult.value).toBe('Hello World');
  });
});

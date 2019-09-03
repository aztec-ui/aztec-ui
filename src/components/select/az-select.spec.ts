import { TestWindow } from '@stencil/core/testing';
import { AzSelect } from './az-select';

describe('az-select', () => {
  it('should build', () => {
    expect(new AzSelect()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAzSelectElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AzSelect],
        html: '<az-select></az-select>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});

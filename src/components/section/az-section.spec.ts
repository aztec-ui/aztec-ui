import { TestWindow } from '@stencil/core/testing';
import { AzSection } from './az-section';

describe('az-section', () => {
  it('should build', () => {
    expect(new AzSection()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAzSectionElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AzSection],
        html: '<az-section></az-section>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});

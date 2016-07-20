'use babel';

import Ph53AsciiArt from '../lib/ph53-ascii-art';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Ph53AsciiArt', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('ph53-ascii-art');
  });

  describe('when the ph53-ascii-art:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.ph53-ascii-art')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'ph53-ascii-art:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.ph53-ascii-art')).toExist();

        let ph53AsciiArtElement = workspaceElement.querySelector('.ph53-ascii-art');
        expect(ph53AsciiArtElement).toExist();

        let ph53AsciiArtPanel = atom.workspace.panelForItem(ph53AsciiArtElement);
        expect(ph53AsciiArtPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'ph53-ascii-art:toggle');
        expect(ph53AsciiArtPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.ph53-ascii-art')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'ph53-ascii-art:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let ph53AsciiArtElement = workspaceElement.querySelector('.ph53-ascii-art');
        expect(ph53AsciiArtElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'ph53-ascii-art:toggle');
        expect(ph53AsciiArtElement).not.toBeVisible();
      });
    });
  });
});

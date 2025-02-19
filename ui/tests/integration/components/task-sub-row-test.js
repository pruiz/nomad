import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { componentA11yAudit } from 'nomad-ui/tests/helpers/a11y-audit';

const mockTask = {
  name: 'another-server',
  state: 'running',
  startedAt: '2022-09-14T17:19:12.351Z',
  finishedAt: null,
  failed: false,
  resources: null,
  events: [
    {
      Type: 'Received',
      Signal: 0,
      ExitCode: 0,
      Time: '2022-09-14T17:19:11.919Z',
      TimeNanos: 156992,
      DisplayMessage: 'Task received by client',
    },
    {
      Type: 'Task Setup',
      Signal: 0,
      ExitCode: 0,
      Time: '2022-09-14T17:19:11.920Z',
      TimeNanos: 793088,
      DisplayMessage: 'Building Task Directory',
    },
    {
      Type: 'Started',
      Signal: 0,
      ExitCode: 0,
      Time: '2022-09-14T17:19:12.351Z',
      TimeNanos: 258112,
      DisplayMessage: 'Task started by client',
    },
    {
      Type: 'Alloc Unhealthy',
      Signal: 0,
      ExitCode: 0,
      Time: '2022-09-14T17:24:11.919Z',
      TimeNanos: 589120,
      DisplayMessage:
        'Task not running for min_healthy_time of 10s by healthy_deadline of 5m0s',
    },
  ],
};

module('Integration | Component | task-sub-row', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    assert.expect(2);
    this.set('task', mockTask);
    await render(hbs`<TaskSubRow @taskState={{this.task}} />`);
    assert.dom(this.element).hasText(`/ ${mockTask.name}`);
    await componentA11yAudit(this.element, assert);
  });
});

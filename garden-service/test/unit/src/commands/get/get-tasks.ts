import { resolve } from "path"
import { makeTestGarden, dataDir, withDefaultGlobalOpts } from "../../../../helpers"
import { GetTasksCommand } from "../../../../../src/commands/get/get-tasks"

describe("GetTasksCommand", () => {
  const projectRoot = resolve(dataDir, "test-project-b")

  it("should run without errors when called without arguments", async () => {
    const garden = await makeTestGarden(projectRoot)
    const log = garden.log
    const command = new GetTasksCommand()

    await command.action({
      garden,
      log,
      headerLog: log,
      footerLog: log,
      args: { tasks: undefined },
      opts: withDefaultGlobalOpts({}),
    })
  })

  it("should run without errors when called with a list of task names", async () => {
    const garden = await makeTestGarden(projectRoot)
    const log = garden.log
    const command = new GetTasksCommand()

    await command.action({
      garden,
      log,
      headerLog: log,
      footerLog: log,
      args: { tasks: ["task-a"] },
      opts: withDefaultGlobalOpts({}),
    })
  })
})

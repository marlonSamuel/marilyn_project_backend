
import { Defect } from "./DefectEntitie";
import { Milestone } from "./MilestoneEntitie";
import { Project } from "./ProjectEntitie";
import { ProjectTaskView } from "./ProjectTaskView";
import { ProjectTestView } from "./ProjectTestView";
import  {ScheduleEntitie}  from "./ScheduleEntitie";
import { Task } from "./TaskEntitie";
import { TestCase } from "./TestCasesEntitie";
import { TestPlan } from "./TestPlanEntitie";
import { TestScenario } from "./TestScenarios";
import { User } from "./UserEntitie";

TestPlan.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'createdBy',
});

TestPlan.belongsTo(User, {
    foreignKey: 'assigned_to',
    as: 'assignedTo',
});

Milestone.belongsTo(Project, {
    foreignKey: 'project_id',
    as: 'project',
});

Task.belongsTo(User, {
    foreignKey: 'assigned_to',
    as: 'assignedTo',
});

Task.belongsTo(Milestone, {
    foreignKey: 'milestone_id',
    as: 'milestone',
});

TestPlan.belongsTo(Project, {
    foreignKey: 'project_id',
    as: 'project',
});

ProjectTaskView.belongsTo(Project, {
    foreignKey: 'id',
    targetKey: 'id',
    as: 'project_task',
});

ProjectTestView.belongsTo(Project, {
    foreignKey: 'id',
    targetKey: 'id',
    as: 'project_test',
});

TestScenario.belongsTo(TestPlan, {
    foreignKey: 'testplan_id',
    as: 'testplan',
});

TestScenario.hasMany(TestCase, {
    foreignKey: 'scenario_id',
    as: 'testcases',
});

TestCase.belongsTo(TestScenario, {
    foreignKey: 'scenario_id',
    as: 'testscenario' // alias para acceder al TestScenario relacionado
});

Defect.belongsTo(TestCase, {
    foreignKey: 'test_case_id',
    as: 'testcase' // alias para acceder al TestScenario relacionado
});

Defect.belongsTo(User, {
    foreignKey: 'assigned_to',
    as: 'assigned' // alias para acceder al TestScenario relacionado
});


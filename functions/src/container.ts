import { asClass, createContainer } from "awilix";
import express from 'express';
import { scopePerRequest } from "awilix-express";
import { UserService } from "./services/UserService";
import { ProjectService } from "./services/ProjectService";
import { MilestoneService } from "./services/MilestoneService";
import { TaskService } from "./services/TaskService";
import { TestPlanService } from "./services/TestPlanService";
import { TestScenarioService } from "./services/TestScenearioService";
import { TestCaseService } from "./services/TestCaseService";
import { DefectService } from "./services/DefectService";
import { NoteService } from "./services/NoteService";
import { IntegrationService } from "./services/IntegrationService";

export default (app: express.Application)=>{
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        userService: asClass(UserService).scoped(),
        projectService: asClass(ProjectService).scoped(),
        milestoneService: asClass(MilestoneService).scoped(),
        taskService: asClass(TaskService).scoped(),
        testPlanService: asClass(TestPlanService).scoped(),
        testScenarioService: asClass(TestScenarioService).scoped(),
        testCaseService: asClass(TestCaseService).scoped(),
        defectService: asClass(DefectService).scoped(),
        noteService: asClass(NoteService).scoped(),
        integrationService: asClass(IntegrationService).scoped()
    });

    app.use(scopePerRequest(container))
};
const hostName = "http://localhost:9084";

export default {

	hostName: hostName,
    dashboards: hostName + "/api/cmis/dashboards",
	clients: hostName + "/api/cmis/clients",
    findClients: hostName + "/api/cmis/clients/find",
    caseWorkers: hostName + "/api/cmis/case-workers",
    engagements: hostName + "/api/cmis/engagements",
    pathways: hostName + "/api/cmis/pathways",
    familyInclusionPlans: hostName + "/api/cmis/fips",
    feedbacks: hostName + "/api/cmis/feedbacks",
    references: hostName + "/api/cmis/references",
    users: hostName + "/api/cmis/users",
}

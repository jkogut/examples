const pulumi = require("@pulumi/pulumi");
const awsx = require("@pulumi/awsx");

let cluster = new awsx.ecs.Cluster("example", { });
let listener= new awsx.elasticloadbalancingv2.NetworkListener("nginx", { port: 80 });
let service = new awsx.ecs.FargateService("nginx", {
    cluster,
    desiredCount: 2,
    taskDefinitionArgs: {
        containers: {
            nginx: {
                image: awsx.ecs.Image.fromPath("nginx", "./app"),
                memory: 512,
                portMappings: [listener],
            },
        },
    },
});

// export just the hostname property of the container frontend
exports.hostname = pulumi.interpolate `http://${listener.endpoint.hostname}`;

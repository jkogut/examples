// Copyright 2016-2019, Pulumi Corporation.  All rights reserved.

// Import Pulumi's config component to interpret user-provided settings.
import { Config } from "@pulumi/pulumi";

// Declare an instance of the Pulumi config to solicit input settings from the
// user for the cluster.
const config = new Config();

export const clusterConfig = {
    // nodeCount is the number of cluster nodes to provision. Defaults to 2 if unspecified.
    nodeCount: config.getNumber("nodeCount") || 2,

    // nodeMachineType is the machine type to use for cluster nodes. Defaults to n1-standard-1 if unspecified.
    // See https://cloud.google.com/compute/docs/machine-types for more details on available machine types.
    nodeMachineType: config.get("nodeMachineType") || "n1-standard-1",

    // minMasterVersion is the minimum master version used in the cluster. Defaults to latest if unspecified.
    minMasterVersion: config.get("minMasterVersion") || "latest",

    // nodeVersion is the node version used in the cluster. Defaults to latest if unspecified.
    nodeVersion: config.get("nodeVersion") || "latest"
};

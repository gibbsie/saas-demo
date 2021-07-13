#!/usr/bin/env bash
aws ssm put-parameter --name "ecs-cwagent" --type "String" --value "`cat ecs-cw-agent-config.json`" --region "ap-southeast-2"
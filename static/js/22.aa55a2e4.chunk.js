(this["webpackJsonp@uiw/react-textarea-code-editor"]=this["webpackJsonp@uiw/react-textarea-code-editor"]||[]).push([[22],{609:function(r,e,n){"use strict";n.r(e),e.default='terraform {\r\n  required_providers {\r\n    aws = {\r\n      source  = "hashicorp/aws"\r\n      version = "~> 1.0.4"\r\n    }\r\n  }\r\n}\r\n\r\nvariable "aws_region" {}\r\n\r\nvariable "base_cidr_block" {\r\n  description = "A /16 CIDR range definition, such as 10.1.0.0/16, that the VPC will use"\r\n  default = "10.1.0.0/16"\r\n}\r\n\r\nvariable "availability_zones" {\r\n  description = "A list of availability zones in which to create subnets"\r\n  type = list(string)\r\n}\r\n\r\nprovider "aws" {\r\n  region = var.aws_region\r\n}\r\n\r\nresource "aws_vpc" "main" {\r\n  # Referencing the base_cidr_block variable allows the network address\r\n  # to be changed without modifying the configuration.\r\n  cidr_block = var.base_cidr_block\r\n}\r\n\r\nresource "aws_subnet" "az" {\r\n  # Create one subnet for each given availability zone.\r\n  count = length(var.availability_zones)\r\n\r\n  # For each subnet, use one of the specified availability zones.\r\n  availability_zone = var.availability_zones[count.index]\r\n\r\n  # By referencing the aws_vpc.main object, Terraform knows that the subnet\r\n  # must be created only after the VPC is created.\r\n  vpc_id = aws_vpc.main.id\r\n\r\n  # Built-in functions and operators can be used for simple transformations of\r\n  # values, such as computing a subnet address. Here we create a /20 prefix for\r\n  # each subnet, using consecutive addresses for each availability zone,\r\n  # such as 10.1.16.0/20 .\r\n  cidr_block = cidrsubnet(aws_vpc.main.cidr_block, 4, count.index+1)\r\n}\r\n'}}]);
//# sourceMappingURL=22.aa55a2e4.chunk.js.map
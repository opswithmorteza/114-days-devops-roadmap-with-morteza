# Complete 114-Day DevOps Roadmap with Morteza

This edition completes every day of the original roadmap and preserves the repository's earlier long-form notes and working assets. Each canonical `notes.md` contains a plain-English explanation, Mermaid flow diagram, concepts, a worked example, a safe lab workflow, review questions, and two assessed projects. Every project directory also includes a non-destructive `lab.sh` helper for prerequisites, planning and documentation checks.

## How to use the roadmap

1. Work through one day at a time; do not copy commands without understanding the target.
2. Complete both projects and keep redacted evidence.
3. Commit daily with a clear message such as `day-035: containerise sample app`.
4. Use a disposable lab and clean up cloud resources immediately after validation.
5. Treat official documentation and the installed version's help pages as authoritative.

| Day | Lesson | Projects |
|---:|---|---|
| 1 | [Linux Basics: Users, Files and Permissions](Day-001_Linux_basics_users_files_permissions/notes.md) | [Project 1](Day-001_Linux_basics_users_files_permissions/project/PROJECT-1.md) · [Project 2](Day-001_Linux_basics_users_files_permissions/project/PROJECT-2.md) |
| 2 | [Linux Processes and systemd](Day-002_Linux_processes_systemd/notes.md) | [Project 1](Day-002_Linux_processes_systemd/project/PROJECT-1.md) · [Project 2](Day-002_Linux_processes_systemd/project/PROJECT-2.md) |
| 3 | [Shell Basics: Pipes and Redirection](Day-003_Shell_basics_pipes_redirection/notes.md) | [Project 1](Day-003_Shell_basics_pipes_redirection/project/PROJECT-1.md) · [Project 2](Day-003_Shell_basics_pipes_redirection/project/PROJECT-2.md) |
| 4 | [Bash Scripting I: Loops and Functions](Day-004_Bash_scripting_I_loops_functions/notes.md) | [Project 1](Day-004_Bash_scripting_I_loops_functions/project/PROJECT-1.md) · [Project 2](Day-004_Bash_scripting_I_loops_functions/project/PROJECT-2.md) |
| 5 | [Bash Scripting II: Regex and Error Handling](Day-005_Bash_scripting_II_regex_error_handling/notes.md) | [Project 1](Day-005_Bash_scripting_II_regex_error_handling/project/PROJECT-1.md) · [Project 2](Day-005_Bash_scripting_II_regex_error_handling/project/PROJECT-2.md) |
| 6 | [Linux Networking Basics](Day-006_Linux_networking_basics/notes.md) | [Project 1](Day-006_Linux_networking_basics/project/PROJECT-1.md) · [Project 2](Day-006_Linux_networking_basics/project/PROJECT-2.md) |
| 7 | [Linux Storage: Partitions and fstab](Day-007_Linux_storage_partitions_fstab/notes.md) | [Project 1](Day-007_Linux_storage_partitions_fstab/project/PROJECT-1.md) · [Project 2](Day-007_Linux_storage_partitions_fstab/project/PROJECT-2.md) |
| 8 | [Web Server Setup: Nginx and Apache](Day-008_Web_server_setup_nginx_apache/notes.md) | [Project 1](Day-008_Web_server_setup_nginx_apache/project/PROJECT-1.md) · [Project 2](Day-008_Web_server_setup_nginx_apache/project/PROJECT-2.md) |
| 9 | [Linux Security: sudo and Firewall](Day-009_Linux_security_basics_sudo_firewall/notes.md) | [Project 1](Day-009_Linux_security_basics_sudo_firewall/project/PROJECT-1.md) · [Project 2](Day-009_Linux_security_basics_sudo_firewall/project/PROJECT-2.md) |
| 10 | [Advanced Networking: DNS Resolver](Day-010_Advanced_networking_DNS_resolver/notes.md) | [Project 1](Day-010_Advanced_networking_DNS_resolver/project/PROJECT-1.md) · [Project 2](Day-010_Advanced_networking_DNS_resolver/project/PROJECT-2.md) |
| 11 | [Mail Services Basics](Day-011_Mail_services_basics/notes.md) | [Project 1](Day-011_Mail_services_basics/project/PROJECT-1.md) · [Project 2](Day-011_Mail_services_basics/project/PROJECT-2.md) |
| 12 | [Advanced Storage: LVM and RAID](Day-012_Storage_advanced_LVM_RAID/notes.md) | [Project 1](Day-012_Storage_advanced_LVM_RAID/project/PROJECT-1.md) · [Project 2](Day-012_Storage_advanced_LVM_RAID/project/PROJECT-2.md) |
| 13 | [Linux Troubleshooting](Day-013_Linux_troubleshooting/notes.md) | [Project 1](Day-013_Linux_troubleshooting/project/PROJECT-1.md) · [Project 2](Day-013_Linux_troubleshooting/project/PROJECT-2.md) |
| 14 | [LPIC-1 and LPIC-2 Review](Day-014_LPIC_1_2_review/notes.md) | [Project 1](Day-014_LPIC_1_2_review/project/PROJECT-1.md) · [Project 2](Day-014_LPIC_1_2_review/project/PROJECT-2.md) |
| 15 | [High Availability and Load Balancing](Day-015_LPIC_3_HA_load_balancing_intro/notes.md) | [Project 1](Day-015_LPIC_3_HA_load_balancing_intro/project/PROJECT-1.md) · [Project 2](Day-015_LPIC_3_HA_load_balancing_intro/project/PROJECT-2.md) |
| 16 | [Virtualization with KVM and libvirt](Day-016_LPIC_3_Virtualization_KVM_libvirt/notes.md) | [Project 1](Day-016_LPIC_3_Virtualization_KVM_libvirt/project/PROJECT-1.md) · [Project 2](Day-016_LPIC_3_Virtualization_KVM_libvirt/project/PROJECT-2.md) |
| 17 | [SELinux and AppArmor](Day-017_LPIC_3_SELinux_AppArmor/notes.md) | [Project 1](Day-017_LPIC_3_SELinux_AppArmor/project/PROJECT-1.md) · [Project 2](Day-017_LPIC_3_SELinux_AppArmor/project/PROJECT-2.md) |
| 18 | [LDAP Basics](Day-018_LPIC_3_LDAP_basics/notes.md) | [Project 1](Day-018_LPIC_3_LDAP_basics/project/PROJECT-1.md) · [Project 2](Day-018_LPIC_3_LDAP_basics/project/PROJECT-2.md) |
| 19 | [LDAP Client Integration](Day-019_LPIC_3_LDAP_client_integration/notes.md) | [Project 1](Day-019_LPIC_3_LDAP_client_integration/project/PROJECT-1.md) · [Project 2](Day-019_LPIC_3_LDAP_client_integration/project/PROJECT-2.md) |
| 20 | [Advanced DNS with BIND](Day-020_LPIC_3_DNS_advanced_BIND/notes.md) | [Project 1](Day-020_LPIC_3_DNS_advanced_BIND/project/PROJECT-1.md) · [Project 2](Day-020_LPIC_3_DNS_advanced_BIND/project/PROJECT-2.md) |
| 21 | [DHCP and PXE](Day-021_LPIC_3_DHCP_PXE/notes.md) | [Project 1](Day-021_LPIC_3_DHCP_PXE/project/PROJECT-1.md) · [Project 2](Day-021_LPIC_3_DHCP_PXE/project/PROJECT-2.md) |
| 22 | [File Sharing with NFS and SMB](Day-022_LPIC_3_File_sharing_NFS_SMB/notes.md) | [Project 1](Day-022_LPIC_3_File_sharing_NFS_SMB/project/PROJECT-1.md) · [Project 2](Day-022_LPIC_3_File_sharing_NFS_SMB/project/PROJECT-2.md) |
| 23 | [SAN Concepts and iSCSI](Day-023_LPIC_3_Storage_SAN_concepts/notes.md) | [Project 1](Day-023_LPIC_3_Storage_SAN_concepts/project/PROJECT-1.md) · [Project 2](Day-023_LPIC_3_Storage_SAN_concepts/project/PROJECT-2.md) |
| 24 | [Performance Tuning I](Day-024_LPIC_3_Performance_tuning_I/notes.md) | [Project 1](Day-024_LPIC_3_Performance_tuning_I/project/PROJECT-1.md) · [Project 2](Day-024_LPIC_3_Performance_tuning_I/project/PROJECT-2.md) |
| 25 | [Performance Tuning II](Day-025_LPIC_3_Performance_tuning_II/notes.md) | [Project 1](Day-025_LPIC_3_Performance_tuning_II/project/PROJECT-1.md) · [Project 2](Day-025_LPIC_3_Performance_tuning_II/project/PROJECT-2.md) |
| 26 | [Auditing and Central Logging](Day-026_LPIC_3_Auditing_logging/notes.md) | [Project 1](Day-026_LPIC_3_Auditing_logging/project/PROJECT-1.md) · [Project 2](Day-026_LPIC_3_Auditing_logging/project/PROJECT-2.md) |
| 27 | [Enterprise Troubleshooting](Day-027_LPIC_3_Enterprise_troubleshooting/notes.md) | [Project 1](Day-027_LPIC_3_Enterprise_troubleshooting/project/PROJECT-1.md) · [Project 2](Day-027_LPIC_3_Enterprise_troubleshooting/project/PROJECT-2.md) |
| 28 | [LPIC-3 Review and Integration](Day-028_LPIC_3_Review_summary/notes.md) | [Project 1](Day-028_LPIC_3_Review_summary/project/PROJECT-1.md) · [Project 2](Day-028_LPIC_3_Review_summary/project/PROJECT-2.md) |
| 29 | [Git and GitHub Basics](Day-029_Git_GitHub_basics/notes.md) | [Project 1](Day-029_Git_GitHub_basics/project/PROJECT-1.md) · [Project 2](Day-029_Git_GitHub_basics/project/PROJECT-2.md) |
| 30 | [Advanced Git: Hooks and Tags](Day-030_Git_advanced_hooks_tags/notes.md) | [Project 1](Day-030_Git_advanced_hooks_tags/project/PROJECT-1.md) · [Project 2](Day-030_Git_advanced_hooks_tags/project/PROJECT-2.md) |
| 31 | [Bash Scripting Refresher](Day-031_Bash_scripting_refresher/notes.md) | [Project 1](Day-031_Bash_scripting_refresher/project/PROJECT-1.md) · [Project 2](Day-031_Bash_scripting_refresher/project/PROJECT-2.md) |
| 32 | [Python Automation: os and subprocess](Day-032_Python_basics_os_subprocess/notes.md) | [Project 1](Day-032_Python_basics_os_subprocess/project/PROJECT-1.md) · [Project 2](Day-032_Python_basics_os_subprocess/project/PROJECT-2.md) |
| 33 | [Python HTTP Automation](Day-033_Python_HTTP_requests/notes.md) | [Project 1](Day-033_Python_HTTP_requests/project/PROJECT-1.md) · [Project 2](Day-033_Python_HTTP_requests/project/PROJECT-2.md) |
| 34 | [systemd Deep Dive](Day-034_systemd_deep_dive/notes.md) | [Project 1](Day-034_systemd_deep_dive/project/PROJECT-1.md) · [Project 2](Day-034_systemd_deep_dive/project/PROJECT-2.md) |
| 35 | [Docker Basics](Day-035_Docker_basics/notes.md) | [Project 1](Day-035_Docker_basics/project/PROJECT-1.md) · [Project 2](Day-035_Docker_basics/project/PROJECT-2.md) |
| 36 | [Docker Volumes and Networks](Day-036_Docker_volumes_networks/notes.md) | [Project 1](Day-036_Docker_volumes_networks/project/PROJECT-1.md) · [Project 2](Day-036_Docker_volumes_networks/project/PROJECT-2.md) |
| 37 | [Docker Compose Basics](Day-037_Docker_Compose_basics/notes.md) | [Project 1](Day-037_Docker_Compose_basics/project/PROJECT-1.md) · [Project 2](Day-037_Docker_Compose_basics/project/PROJECT-2.md) |
| 38 | [Nginx Reverse Proxy with Compose](Day-038_Reverse_proxy_nginx_with_Compose/notes.md) | [Project 1](Day-038_Reverse_proxy_nginx_with_Compose/project/PROJECT-1.md) · [Project 2](Day-038_Reverse_proxy_nginx_with_Compose/project/PROJECT-2.md) |
| 39 | [Jenkins Basics](Day-039_Jenkins_basics/notes.md) | [Project 1](Day-039_Jenkins_basics/project/PROJECT-1.md) · [Project 2](Day-039_Jenkins_basics/project/PROJECT-2.md) |
| 40 | [Jenkins Advanced: Agents and Stages](Day-040_Jenkins_advanced_agents_stages/notes.md) | [Project 1](Day-040_Jenkins_advanced_agents_stages/project/PROJECT-1.md) · [Project 2](Day-040_Jenkins_advanced_agents_stages/project/PROJECT-2.md) |
| 41 | [GitHub Actions Basics](Day-041_GitHub_Actions_basics/notes.md) | [Project 1](Day-041_GitHub_Actions_basics/project/PROJECT-1.md) · [Project 2](Day-041_GitHub_Actions_basics/project/PROJECT-2.md) |
| 42 | [GitHub Actions Deployment](Day-042_GitHub_Actions_deploy/notes.md) | [Project 1](Day-042_GitHub_Actions_deploy/project/PROJECT-1.md) · [Project 2](Day-042_GitHub_Actions_deploy/project/PROJECT-2.md) |
| 43 | [Ansible Basics](Day-043_Ansible_basics/notes.md) | [Project 1](Day-043_Ansible_basics/project/PROJECT-1.md) · [Project 2](Day-043_Ansible_basics/project/PROJECT-2.md) |
| 44 | [Ansible Roles and Handlers](Day-044_Ansible_roles_handlers/notes.md) | [Project 1](Day-044_Ansible_roles_handlers/project/PROJECT-1.md) · [Project 2](Day-044_Ansible_roles_handlers/project/PROJECT-2.md) |
| 45 | [Ansible Vault and Secrets](Day-045_Ansible_Vault_secrets/notes.md) | [Project 1](Day-045_Ansible_Vault_secrets/project/PROJECT-1.md) · [Project 2](Day-045_Ansible_Vault_secrets/project/PROJECT-2.md) |
| 46 | [Terraform Basics](Day-046_Terraform_basics/notes.md) | [Project 1](Day-046_Terraform_basics/project/PROJECT-1.md) · [Project 2](Day-046_Terraform_basics/project/PROJECT-2.md) |
| 47 | [Terraform Modules](Day-047_Terraform_modules/notes.md) | [Project 1](Day-047_Terraform_modules/project/PROJECT-1.md) · [Project 2](Day-047_Terraform_modules/project/PROJECT-2.md) |
| 48 | [Terraform and Ansible Integration](Day-048_Terraform_Ansible/notes.md) | [Project 1](Day-048_Terraform_Ansible/project/PROJECT-1.md) · [Project 2](Day-048_Terraform_Ansible/project/PROJECT-2.md) |
| 49 | [Kubernetes Basics](Day-049_Kubernetes_basics/notes.md) | [Project 1](Day-049_Kubernetes_basics/project/PROJECT-1.md) · [Project 2](Day-049_Kubernetes_basics/project/PROJECT-2.md) |
| 50 | [Kubernetes Deployments and Services](Day-050_K8s_services_deployments/notes.md) | [Project 1](Day-050_K8s_services_deployments/project/PROJECT-1.md) · [Project 2](Day-050_K8s_services_deployments/project/PROJECT-2.md) |
| 51 | [Kubernetes ConfigMaps and Secrets](Day-051_ConfigMaps_Secrets/notes.md) | [Project 1](Day-051_ConfigMaps_Secrets/project/PROJECT-1.md) · [Project 2](Day-051_ConfigMaps_Secrets/project/PROJECT-2.md) |
| 52 | [Kubernetes Ingress Controller](Day-052_Ingress_controller/notes.md) | [Project 1](Day-052_Ingress_controller/project/PROJECT-1.md) · [Project 2](Day-052_Ingress_controller/project/PROJECT-2.md) |
| 53 | [Helm Basics](Day-053_Helm_basics/notes.md) | [Project 1](Day-053_Helm_basics/project/PROJECT-1.md) · [Project 2](Day-053_Helm_basics/project/PROJECT-2.md) |
| 54 | [Helm Advanced](Day-054_Helm_advanced/notes.md) | [Project 1](Day-054_Helm_advanced/project/PROJECT-1.md) · [Project 2](Day-054_Helm_advanced/project/PROJECT-2.md) |
| 55 | [AWS Basics](Day-055_AWS_basics/notes.md) | [Project 1](Day-055_AWS_basics/project/PROJECT-1.md) · [Project 2](Day-055_AWS_basics/project/PROJECT-2.md) |
| 56 | [AWS IAM](Day-056_AWS_IAM/notes.md) | [Project 1](Day-056_AWS_IAM/project/PROJECT-1.md) · [Project 2](Day-056_AWS_IAM/project/PROJECT-2.md) |
| 57 | [Amazon EKS](Day-057_EKS_basics/notes.md) | [Project 1](Day-057_EKS_basics/project/PROJECT-1.md) · [Project 2](Day-057_EKS_basics/project/PROJECT-2.md) |
| 58 | [GCP and GKE Basics](Day-058_GCP_basics/notes.md) | [Project 1](Day-058_GCP_basics/project/PROJECT-1.md) · [Project 2](Day-058_GCP_basics/project/PROJECT-2.md) |
| 59 | [Azure and AKS Basics](Day-059_Azure_basics/notes.md) | [Project 1](Day-059_Azure_basics/project/PROJECT-1.md) · [Project 2](Day-059_Azure_basics/project/PROJECT-2.md) |
| 60 | [Multi-Cloud Review](Day-060_Cloud_review/notes.md) | [Project 1](Day-060_Cloud_review/project/PROJECT-1.md) · [Project 2](Day-060_Cloud_review/project/PROJECT-2.md) |
| 61 | [Elastic Stack Basics](Day-061_ELK_Stack_basics/notes.md) | [Project 1](Day-061_ELK_Stack_basics/project/PROJECT-1.md) · [Project 2](Day-061_ELK_Stack_basics/project/PROJECT-2.md) |
| 62 | [Fluentd and Logstash Pipelines](Day-062_Fluentd_Logstash_pipelines/notes.md) | [Project 1](Day-062_Fluentd_Logstash_pipelines/project/PROJECT-1.md) · [Project 2](Day-062_Fluentd_Logstash_pipelines/project/PROJECT-2.md) |
| 63 | [Prometheus Basics](Day-063_Prometheus_basics/notes.md) | [Project 1](Day-063_Prometheus_basics/project/PROJECT-1.md) · [Project 2](Day-063_Prometheus_basics/project/PROJECT-2.md) |
| 64 | [Grafana Dashboards](Day-064_Grafana_dashboards/notes.md) | [Project 1](Day-064_Grafana_dashboards/project/PROJECT-1.md) · [Project 2](Day-064_Grafana_dashboards/project/PROJECT-2.md) |
| 65 | [DevSecOps Basics](Day-065_DevSecOps_basics/notes.md) | [Project 1](Day-065_DevSecOps_basics/project/PROJECT-1.md) · [Project 2](Day-065_DevSecOps_basics/project/PROJECT-2.md) |
| 66 | [HashiCorp Vault Basics](Day-066_HashiCorp_Vault_basics/notes.md) | [Project 1](Day-066_HashiCorp_Vault_basics/project/PROJECT-1.md) · [Project 2](Day-066_HashiCorp_Vault_basics/project/PROJECT-2.md) |
| 67 | [Vault with Kubernetes](Day-067_Vault_Kubernetes/notes.md) | [Project 1](Day-067_Vault_Kubernetes/project/PROJECT-1.md) · [Project 2](Day-067_Vault_Kubernetes/project/PROJECT-2.md) |
| 68 | [Security in CI/CD](Day-068_Security_in_CI_CD/notes.md) | [Project 1](Day-068_Security_in_CI_CD/project/PROJECT-1.md) · [Project 2](Day-068_Security_in_CI_CD/project/PROJECT-2.md) |
| 69 | [Capstone Architecture Design](Day-069_Capstone_design/notes.md) | [Project 1](Day-069_Capstone_design/project/PROJECT-1.md) · [Project 2](Day-069_Capstone_design/project/PROJECT-2.md) |
| 70 | [Capstone Repository Setup](Day-070_Capstone_repos_setup/notes.md) | [Project 1](Day-070_Capstone_repos_setup/project/PROJECT-1.md) · [Project 2](Day-070_Capstone_repos_setup/project/PROJECT-2.md) |
| 71 | [Capstone CI/CD Pipeline](Day-071_Capstone_CI_CD_pipeline/notes.md) | [Project 1](Day-071_Capstone_CI_CD_pipeline/project/PROJECT-1.md) · [Project 2](Day-071_Capstone_CI_CD_pipeline/project/PROJECT-2.md) |
| 72 | [Capstone Infrastructure Deployment](Day-072_Capstone_deploy_infra/notes.md) | [Project 1](Day-072_Capstone_deploy_infra/project/PROJECT-1.md) · [Project 2](Day-072_Capstone_deploy_infra/project/PROJECT-2.md) |
| 73 | [Capstone Application Deployment](Day-073_Capstone_deploy_app/notes.md) | [Project 1](Day-073_Capstone_deploy_app/project/PROJECT-1.md) · [Project 2](Day-073_Capstone_deploy_app/project/PROJECT-2.md) |
| 74 | [Capstone Monitoring](Day-074_Capstone_monitoring/notes.md) | [Project 1](Day-074_Capstone_monitoring/project/PROJECT-1.md) · [Project 2](Day-074_Capstone_monitoring/project/PROJECT-2.md) |
| 75 | [Capstone Logging](Day-075_Capstone_logging/notes.md) | [Project 1](Day-075_Capstone_logging/project/PROJECT-1.md) · [Project 2](Day-075_Capstone_logging/project/PROJECT-2.md) |
| 76 | [Capstone Secrets Management](Day-076_Capstone_secrets_mgmt/notes.md) | [Project 1](Day-076_Capstone_secrets_mgmt/project/PROJECT-1.md) · [Project 2](Day-076_Capstone_secrets_mgmt/project/PROJECT-2.md) |
| 77 | [Capstone Testing I](Day-077_Capstone_testing_I/notes.md) | [Project 1](Day-077_Capstone_testing_I/project/PROJECT-1.md) · [Project 2](Day-077_Capstone_testing_I/project/PROJECT-2.md) |
| 78 | [Capstone Testing II](Day-078_Capstone_testing_II/notes.md) | [Project 1](Day-078_Capstone_testing_II/project/PROJECT-1.md) · [Project 2](Day-078_Capstone_testing_II/project/PROJECT-2.md) |
| 79 | [Capstone Troubleshooting](Day-079_Capstone_troubleshooting/notes.md) | [Project 1](Day-079_Capstone_troubleshooting/project/PROJECT-1.md) · [Project 2](Day-079_Capstone_troubleshooting/project/PROJECT-2.md) |
| 80 | [Capstone Documentation](Day-080_Capstone_docs/notes.md) | [Project 1](Day-080_Capstone_docs/project/PROJECT-1.md) · [Project 2](Day-080_Capstone_docs/project/PROJECT-2.md) |
| 81 | [Capstone Polish](Day-081_Capstone_polish/notes.md) | [Project 1](Day-081_Capstone_polish/project/PROJECT-1.md) · [Project 2](Day-081_Capstone_polish/project/PROJECT-2.md) |
| 82 | [Capstone Presentation](Day-082_Capstone_presentation/notes.md) | [Project 1](Day-082_Capstone_presentation/project/PROJECT-1.md) · [Project 2](Day-082_Capstone_presentation/project/PROJECT-2.md) |
| 83 | [Capstone Publishing](Day-083_Capstone_publish/notes.md) | [Project 1](Day-083_Capstone_publish/project/PROJECT-1.md) · [Project 2](Day-083_Capstone_publish/project/PROJECT-2.md) |
| 84 | [Journey Review](Day-084_Journey_review/notes.md) | [Project 1](Day-084_Journey_review/project/PROJECT-1.md) · [Project 2](Day-084_Journey_review/project/PROJECT-2.md) |
| 85 | [Personal Branding for DevOps](Day-085_Personal_branding/notes.md) | [Project 1](Day-085_Personal_branding/project/PROJECT-1.md) · [Project 2](Day-085_Personal_branding/project/PROJECT-2.md) |
| 86 | [Final DevOps Cheatsheet](Day-086_Final_DevOps_cheatsheet/notes.md) | [Project 1](Day-086_Final_DevOps_cheatsheet/project/PROJECT-1.md) · [Project 2](Day-086_Final_DevOps_cheatsheet/project/PROJECT-2.md) |
| 87 | [GitOps with Argo CD](Day-087_Buffer_Extra_Labs/notes.md) | [Project 1](Day-087_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-087_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 88 | [GitOps with Flux CD](Day-088_Buffer_Extra_Labs/notes.md) | [Project 1](Day-088_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-088_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 89 | [Container Security Hardening](Day-089_Buffer_Extra_Labs/notes.md) | [Project 1](Day-089_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-089_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 90 | [Kubernetes Security: RBAC and NetworkPolicy](Day-090_Buffer_Extra_Labs/notes.md) | [Project 1](Day-090_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-090_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 91 | [Kubernetes Autoscaling](Day-091_Buffer_Extra_Labs/notes.md) | [Project 1](Day-091_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-091_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 92 | [Stateful Workloads in Kubernetes](Day-092_Buffer_Extra_Labs/notes.md) | [Project 1](Day-092_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-092_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 93 | [Service Mesh Fundamentals](Day-093_Buffer_Extra_Labs/notes.md) | [Project 1](Day-093_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-093_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 94 | [OpenTelemetry Observability](Day-094_Buffer_Extra_Labs/notes.md) | [Project 1](Day-094_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-094_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 95 | [SLOs, SLIs and Error Budgets](Day-095_Buffer_Extra_Labs/notes.md) | [Project 1](Day-095_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-095_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 96 | [Alertmanager and On-Call](Day-096_Buffer_Extra_Labs/notes.md) | [Project 1](Day-096_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-096_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 97 | [Incident Response and Postmortems](Day-097_Buffer_Extra_Labs/notes.md) | [Project 1](Day-097_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-097_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 98 | [Backup and Disaster Recovery](Day-098_Buffer_Extra_Labs/notes.md) | [Project 1](Day-098_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-098_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 99 | [PostgreSQL Operations](Day-099_Buffer_Extra_Labs/notes.md) | [Project 1](Day-099_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-099_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 100 | [Redis and Caching Operations](Day-100_Buffer_Extra_Labs/notes.md) | [Project 1](Day-100_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-100_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 101 | [Messaging with RabbitMQ and Kafka](Day-101_Buffer_Extra_Labs/notes.md) | [Project 1](Day-101_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-101_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 102 | [API Gateway and Rate Limiting](Day-102_Buffer_Extra_Labs/notes.md) | [Project 1](Day-102_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-102_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 103 | [TLS, PKI and cert-manager](Day-103_Buffer_Extra_Labs/notes.md) | [Project 1](Day-103_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-103_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 104 | [Software Supply Chain Security](Day-104_Buffer_Extra_Labs/notes.md) | [Project 1](Day-104_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-104_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 105 | [Policy as Code with OPA](Day-105_Buffer_Extra_Labs/notes.md) | [Project 1](Day-105_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-105_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 106 | [FinOps and Cloud Cost Optimisation](Day-106_Buffer_Extra_Labs/notes.md) | [Project 1](Day-106_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-106_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 107 | [Multi-Environment GitOps](Day-107_Buffer_Extra_Labs/notes.md) | [Project 1](Day-107_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-107_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 108 | [Chaos Engineering](Day-108_Buffer_Extra_Labs/notes.md) | [Project 1](Day-108_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-108_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 109 | [Platform Engineering Fundamentals](Day-109_Buffer_Extra_Labs/notes.md) | [Project 1](Day-109_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-109_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 110 | [Backstage Developer Portal](Day-110_Buffer_Extra_Labs/notes.md) | [Project 1](Day-110_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-110_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 111 | [Advanced Terraform Testing and Policy](Day-111_Buffer_Extra_Labs/notes.md) | [Project 1](Day-111_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-111_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 112 | [Progressive Delivery](Day-112_Buffer_Extra_Labs/notes.md) | [Project 1](Day-112_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-112_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 113 | [DevOps Portfolio and Interview Lab](Day-113_Buffer_Extra_Labs/notes.md) | [Project 1](Day-113_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-113_Buffer_Extra_Labs/project/PROJECT-2.md) |
| 114 | [Production Readiness Review and Graduation](Day-114_Buffer_Extra_Labs/notes.md) | [Project 1](Day-114_Buffer_Extra_Labs/project/PROJECT-1.md) · [Project 2](Day-114_Buffer_Extra_Labs/project/PROJECT-2.md) |

## Portfolio standard

A completed day is more than a checked box. It includes reproducible code/configuration, a diagram, objective validation, one controlled failure, a rollback, cleanup, and a short reflection. Never publish secrets, private infrastructure details, employer data, or unredacted screenshots.

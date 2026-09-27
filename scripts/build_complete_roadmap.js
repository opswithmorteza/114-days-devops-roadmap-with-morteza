const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// The first 86 subjects follow the repository's original PROGRESS.md. Days 87-114
// turn the old "buffer" entries into an advanced, job-ready DevOps/SRE track.
const raw = `
1|Linux Basics: Users, Files and Permissions|identity,ownership,permissions,least privilege|id; ls -la; chmod 640 app.conf; sudo -l
2|Linux Processes and systemd|process lifecycle,signals,units,journal|ps aux; systemctl status ssh; journalctl -u ssh --since today
3|Shell Basics: Pipes and Redirection|stdin/stdout/stderr,pipelines,filters,exit codes|journalctl -p err | grep -i failed | sort | uniq -c
4|Bash Scripting I: Loops and Functions|safe variables,loops,functions,arguments|for host in web1 web2; do check_host "$host"; done
5|Bash Scripting II: Regex and Error Handling|strict mode,regex,traps,defensive scripts|set -Eeuo pipefail; trap 'echo failed at $LINENO' ERR
6|Linux Networking Basics|interfaces,routes,ports,packet flow|ip -br a; ip route; ss -lntup; curl -v http://localhost
7|Linux Storage: Partitions and fstab|block devices,filesystems,mounts,persistent storage|lsblk -f; findmnt; sudo mount -a
8|Web Server Setup: Nginx and Apache|HTTP,virtual hosts,static content,TLS readiness|curl -I http://localhost; sudo nginx -t
9|Linux Security: sudo and Firewall|privilege delegation,firewall policy,attack surface,audit trail|sudo -l; sudo ufw status verbose
10|Advanced Networking: DNS Resolver|name resolution,records,caching,diagnostics|dig +trace example.com; resolvectl status
11|Mail Services Basics|SMTP flow,DNS records,relay controls,deliverability|dig MX example.com; openssl s_client -starttls smtp -connect host:587
12|Advanced Storage: LVM and RAID|physical/logical volumes,RAID levels,resizing,recovery|pvs; vgs; lvs; cat /proc/mdstat
13|Linux Troubleshooting|evidence collection,resource triage,network triage,root cause|uptime; free -h; df -h; journalctl -p warning -b
14|LPIC-1 and LPIC-2 Review|administration,networking,services,troubleshooting|uname -a; systemctl --failed; ss -lntup
15|High Availability and Load Balancing|health checks,VIP,HAProxy,Keepalived|curl http://VIP/health; sudo haproxy -c -f /etc/haproxy/haproxy.cfg
16|Virtualization with KVM and libvirt|hypervisor,images,networks,resource isolation|virsh list --all; virsh net-list --all
17|SELinux and AppArmor|mandatory access control,labels/profiles,denials,least privilege|getenforce; ausearch -m AVC -ts recent; aa-status
18|LDAP Basics|directory tree,DN/schema,bind/search,access control|ldapsearch -x -LLL -H ldap://localhost -b dc=lab,dc=local
19|LDAP Client Integration|SSSD,NSS/PAM,caching,central identity|getent passwd alice; sssctl domain-status lab.local
20|Advanced DNS with BIND|zones,authoritative DNS,recursion,DNSSEC|named-checkconf; named-checkzone lab.local /etc/bind/db.lab.local
21|DHCP and PXE|leases,options,TFTP,network boot|dhcpd -t -cf /etc/dhcp/dhcpd.conf; tcpdump -ni any port 67 or port 68
22|File Sharing with NFS and SMB|exports/shares,identity mapping,mount options,access control|exportfs -v; showmount -e localhost; smbclient -L localhost
23|SAN Concepts and iSCSI|targets,initiators,LUNs,multipathing|iscsiadm -m discovery -t sendtargets -p 10.0.0.10; multipath -ll
24|Performance Tuning I|baseline,CPU,memory,load|vmstat 1 5; pidstat 1 5; sar -u 1 5
25|Performance Tuning II|disk I/O,network latency,kernel limits,capacity|iostat -xz 1 5; ss -s; sysctl -a
26|Auditing and Central Logging|audit rules,rsyslog,journald,retention|auditctl -l; logger 'roadmap test'; journalctl -n 20
27|Enterprise Troubleshooting|layered diagnosis,change correlation,HA failure,recovery|systemctl --failed; ip route; dig service.lab; curl -vk https://service.lab
28|LPIC-3 Review and Integration|HA,virtualization,security,identity|virsh list; getenforce; ldapsearch -x; haproxy -c -f /etc/haproxy/haproxy.cfg
29|Git and GitHub Basics|commits,branches,remotes,pull requests|git status; git switch -c feature/readme; git log --oneline --graph
30|Advanced Git: Hooks and Tags|history hygiene,hooks,releases,recovery|git tag -s v1.0.0 -m 'release'; git reflog
31|Bash Scripting Refresher|idempotency,logging,CLI design,testing|bash -n script.sh; shellcheck script.sh
32|Python Automation: os and subprocess|filesystem APIs,process execution,errors,structured output|python -c "import subprocess; print(subprocess.run(['uname','-a'],capture_output=True,text=True).stdout)"
33|Python HTTP Automation|requests,timeouts,retries,API data|python -c "import requests; print(requests.get('https://example.com',timeout=5).status_code)"
34|systemd Deep Dive|dependencies,service hardening,timers,restart policy|systemd-analyze critical-chain; systemctl show app.service
35|Docker Basics|images,containers,Dockerfile,layers|docker build -t demo:1.0 .; docker run --rm -p 8080:80 demo:1.0
36|Docker Volumes and Networks|persistence,bridge networks,DNS,isolation|docker volume ls; docker network inspect app-net
37|Docker Compose Basics|multi-container apps,dependencies,health checks,environments|docker compose config; docker compose up -d; docker compose ps
38|Nginx Reverse Proxy with Compose|routing,upstreams,headers,TLS termination|docker compose exec proxy nginx -t; curl -I http://localhost
39|Jenkins Basics|controller,job,pipeline,credentials|java -jar jenkins-cli.jar -s http://localhost:8080/ who-am-i
40|Jenkins Advanced: Agents and Stages|distributed builds,parallelism,artifacts,quality gates|jenkinsfile-runner -w war -p plugins -f Jenkinsfile
41|GitHub Actions Basics|workflows,triggers,runners,artifacts|gh workflow list; gh run list
42|GitHub Actions Deployment|environments,approvals,secrets,rollback|gh workflow run deploy.yml -f environment=staging
43|Ansible Basics|inventory,modules,playbooks,idempotency|ansible all -m ping; ansible-playbook --check site.yml
44|Ansible Roles and Handlers|roles,variables,templates,handlers|ansible-playbook site.yml --syntax-check; ansible-lint
45|Ansible Vault and Secrets|encrypted data,vault IDs,secret lifecycle,no-log|ansible-vault encrypt group_vars/prod/vault.yml
46|Terraform Basics|providers,state,plan,apply|terraform fmt -check; terraform validate; terraform plan
47|Terraform Modules|inputs,outputs,composition,versioning|terraform init; terraform test; terraform providers
48|Terraform and Ansible Integration|provisioning,inventory handoff,configuration,orchestration|terraform output -json > outputs.json; ansible-playbook -i inventory.yml site.yml
49|Kubernetes Basics|control plane,Pods,declarative API,kubectl|kubectl get nodes; kubectl get pods -A
50|Kubernetes Deployments and Services|replicas,rollouts,selectors,service discovery|kubectl rollout status deploy/web; kubectl get svc,endpoints
51|Kubernetes ConfigMaps and Secrets|configuration,secret references,rollouts,external secrets|kubectl create configmap app --from-literal=MODE=prod --dry-run=client -o yaml
52|Kubernetes Ingress Controller|ingress rules,controllers,DNS,TLS|kubectl get ingress -A; curl -H 'Host: app.local' http://INGRESS_IP
53|Helm Basics|charts,values,templates,releases|helm lint chart; helm template demo chart; helm upgrade --install demo chart
54|Helm Advanced|dependencies,hooks,schema,release strategy|helm dependency update chart; helm history demo; helm rollback demo 1
55|AWS Basics|regions,VPC,compute,shared responsibility|aws sts get-caller-identity; aws ec2 describe-vpcs
56|AWS IAM|principals,policies,roles,least privilege|aws iam simulate-principal-policy --policy-source-arn ARN --action-names s3:GetObject
57|Amazon EKS|managed control plane,node groups,access,operations|aws eks update-kubeconfig --name demo; kubectl get nodes
58|GCP and GKE Basics|projects,IAM,VPC,GKE|gcloud auth list; gcloud container clusters get-credentials demo --region europe-west2
59|Azure and AKS Basics|resource groups,Entra ID,VNet,AKS|az account show; az aks get-credentials -g demo-rg -n demo-aks
60|Multi-Cloud Review|service mapping,identity,networking,cost governance|terraform plan; kubectl cluster-info
61|Elastic Stack Basics|Elasticsearch,ingest,Kibana,index lifecycle|curl -s localhost:9200/_cluster/health?pretty
62|Fluentd and Logstash Pipelines|inputs,parsing,buffers,outputs|logstash --config.test_and_exit -f pipeline.conf
63|Prometheus Basics|metrics,scraping,PromQL,alert rules|curl -s localhost:9090/-/ready; promtool check rules alerts.yml
64|Grafana Dashboards|data sources,panels,variables,alerting|curl -s http://localhost:3000/api/health
65|DevSecOps Basics|shift left,threat modelling,scanning,risk gates|trivy fs .; semgrep scan --config auto
66|HashiCorp Vault Basics|secret engines,tokens,policies,leases|vault status; vault secrets list; vault token lookup
67|Vault with Kubernetes|auth method,service accounts,dynamic secrets,rotation|vault auth list; kubectl describe pod demo
68|Security in CI/CD|SAST,SCA,image scanning,provenance|trivy image demo:latest; syft demo:latest
69|Capstone Architecture Design|requirements,trade-offs,diagram,acceptance criteria|docker compose config; terraform validate
70|Capstone Repository Setup|repository layout,branch policy,issue templates,automation|git switch -c feat/bootstrap; pre-commit run --all-files
71|Capstone CI/CD Pipeline|build,test,scan,publish|docker build -t app:$GIT_SHA .; trivy image app:$GIT_SHA
72|Capstone Infrastructure Deployment|IaC,state,environments,drift|terraform plan -out=tfplan; terraform show tfplan
73|Capstone Application Deployment|release manifests,health probes,rollout,rollback|kubectl apply -f k8s; kubectl rollout status deploy/app
74|Capstone Monitoring|SLIs,metrics,alerts,dashboards|promtool check rules monitoring/alerts.yml
75|Capstone Logging|structured logs,collection,search,retention|curl -s localhost:9200/_cat/indices?v
76|Capstone Secrets Management|secret inventory,delivery,rotation,audit|vault policy read app; vault audit list
77|Capstone Testing I|unit tests,lint,contract tests,fast feedback|pytest -q; shellcheck scripts/*.sh
78|Capstone Testing II|integration,load,security,resilience|k6 run tests/load.js; trivy config .
79|Capstone Troubleshooting|runbooks,signals,hypotheses,recovery|kubectl get events --sort-by=.lastTimestamp; kubectl logs deploy/app
80|Capstone Documentation|README,architecture,runbooks,ADRs|markdownlint '**/*.md'; linkchecker README.md
81|Capstone Polish|developer experience,cleanup,reproducibility,quality|make verify; git diff --check
82|Capstone Presentation|storytelling,demo path,evidence,Q&A|make demo; make smoke-test
83|Capstone Publishing|release,portfolio,licensing,announcement|git tag -s v1.0.0 -m 'capstone'; gh release create v1.0.0
84|Journey Review|skill matrix,gap analysis,evidence,next steps|git log --since='114 days ago' --oneline
85|Personal Branding for DevOps|positioning,proof of work,LinkedIn,Github profile|gh repo list --limit 20
86|Final DevOps Cheatsheet|commands,decision trees,incident shortcuts,references|make verify; kubectl get all -A; terraform validate
87|GitOps with Argo CD|desired state,reconciliation,sync policy,drift|argocd app get demo; argocd app sync demo
88|GitOps with Flux CD|sources,kustomizations,Helm releases,reconciliation|flux check; flux get all -A
89|Container Security Hardening|minimal images,non-root,capabilities,read-only FS|docker scout cves demo:latest; trivy image demo:latest
90|Kubernetes Security: RBAC and NetworkPolicy|service accounts,roles,admission,network isolation|kubectl auth can-i --as=system:serviceaccount:demo:app get pods
91|Kubernetes Autoscaling|requests/limits,HPA,metrics,load tests|kubectl autoscale deploy web --cpu-percent=60 --min=2 --max=10
92|Stateful Workloads in Kubernetes|StatefulSets,PVs,PVCs,backup|kubectl get statefulset,pv,pvc; kubectl describe pvc data-db-0
93|Service Mesh Fundamentals|sidecars,mTLS,traffic policy,telemetry|istioctl analyze; kubectl get virtualservice,destinationrule -A
94|OpenTelemetry Observability|traces,metrics,logs,context propagation|otelcol --config collector.yaml --dry-run
95|SLOs, SLIs and Error Budgets|user journeys,indicators,objectives,burn rate|promtool test rules slo-tests.yml
96|Alertmanager and On-Call|routing,inhibition,silences,escalation|amtool check-config alertmanager.yml; amtool alert query
97|Incident Response and Postmortems|severity,incident command,timeline,learning|date -u; kubectl get events --sort-by=.metadata.creationTimestamp
98|Backup and Disaster Recovery|RPO,RTO,backup integrity,restore drills|restic snapshots; restic check
99|PostgreSQL Operations|roles,backups,query plans,replication|psql -c 'select version();'; pg_dump -Fc app > app.dump
100|Redis and Caching Operations|data structures,TTL,persistence,eviction|redis-cli INFO; redis-cli --latency
101|Messaging with RabbitMQ and Kafka|queues/topics,delivery semantics,consumer lag,dead letters|rabbitmq-diagnostics check_running; kafka-consumer-groups.sh --describe --all-groups
102|API Gateway and Rate Limiting|routing,authentication,quotas,observability|curl -i -H 'Authorization: Bearer TOKEN' https://api.local/health
103|TLS, PKI and cert-manager|trust chain,CSRs,rotation,ACME|openssl s_client -connect app.local:443 -servername app.local; kubectl get certificate
104|Software Supply Chain Security|SBOM,signing,provenance,verification|syft demo:latest -o cyclonedx-json; cosign verify IMAGE
105|Policy as Code with OPA|Rego,admission policy,tests,exceptions|opa test policy/; conftest test k8s/
106|FinOps and Cloud Cost Optimisation|tagging,right-sizing,unit cost,budgets|infracost breakdown --path .
107|Multi-Environment GitOps|promotion,overlays,environment policy,drift|kustomize build overlays/staging; flux diff kustomization staging
108|Chaos Engineering|steady state,hypothesis,blast radius,recovery|kubectl delete pod -l app=web; kubectl rollout status deploy/web
109|Platform Engineering Fundamentals|golden paths,self-service,guardrails,product thinking|make bootstrap; make verify
110|Backstage Developer Portal|catalog,templates,plugins,ownership|npx @backstage/cli repo lint; curl localhost:7007/api/catalog/entities
111|Advanced Terraform Testing and Policy|native tests,lint,security policy,contract|terraform test; tflint; checkov -d .
112|Progressive Delivery|canary,blue-green,feature flags,automated analysis|kubectl argo rollouts get rollout app; kubectl argo rollouts promote app
113|DevOps Portfolio and Interview Lab|STAR stories,system design,live troubleshooting,evidence|gh repo view; git log --oneline --decorate -10
114|Production Readiness Review and Graduation|reliability,security,operability,recovery|make verify; make smoke-test; make disaster-recovery-test
`.trim();

const lessons = raw.split(/\r?\n/).map(line => {
  const [day, title, focus, example] = line.split('|');
  return { day: Number(day), title, focus: focus.split(','), example };
});

const phaseFor = day => day <= 14 ? 'Linux foundation' : day <= 28 ? 'enterprise Linux' : day <= 34 ? 'automation and source control' : day <= 42 ? 'containers and CI/CD' : day <= 48 ? 'configuration and infrastructure as code' : day <= 54 ? 'Kubernetes packaging and delivery' : day <= 60 ? 'cloud platforms' : day <= 68 ? 'observability and DevSecOps' : day <= 83 ? 'capstone delivery' : day <= 86 ? 'career consolidation' : 'advanced DevOps and SRE';

const contextFor = day => {
  if (day <= 14) return 'Use one Ubuntu or Debian VM. Take a snapshot first and keep a second terminal open so you can recover from permission, network, or storage mistakes.';
  if (day <= 28) return 'Use two or three disposable Linux VMs on an isolated lab network. Record hostnames, addresses, credentials, and rollback steps before changing services.';
  if (day <= 34) return 'Use a small Git repository containing scripts and tests. Never put credentials in the repository; use environment variables and ignored local files.';
  if (day <= 42) return 'Use the repository sample application and a local container runtime. Pin versions, keep build output reproducible, and publish only to a test registry.';
  if (day <= 54) return 'Use kind, minikube, or a disposable Kubernetes cluster. Work in a dedicated namespace and define resource requests so experiments remain contained.';
  if (day <= 60) return 'Use a sandbox cloud account with budgets and alerts. Prefer the UK region that meets your needs, tag every resource, and destroy chargeable resources after the lab.';
  if (day <= 68) return 'Use the sample application and local Kubernetes lab. Generate synthetic data only and avoid copying production logs or secrets into the exercise.';
  if (day <= 83) return 'Continue the same capstone: a containerised web service delivered to Kubernetes with infrastructure as code, CI/CD, monitoring, logging, and secure secret delivery.';
  if (day <= 86) return 'Work from evidence in this repository: commits, diagrams, screenshots, runbooks, and measurable outcomes. Remove private information before publishing.';
  return 'Use a disposable local or cloud sandbox and connect the lab to the capstone where useful. Define a rollback and a cost limit before starting.';
};

const projectNames = (lesson) => {
  const short = lesson.title.replace(/^(Advanced |Final )/, '');
  if (lesson.day >= 69 && lesson.day <= 83) return [`Capstone milestone: ${short}`, `Failure and review exercise: ${short}`];
  if (lesson.day === 85) return ['Build an evidence-led DevOps profile', 'Create a four-week publishing system'];
  if (lesson.day === 114) return ['Production readiness assessment', 'Graduation incident simulation'];
  return [`Guided build: ${short}`, `Production challenge: ${short}`];
};

function plainEnglishFor(l) {
  const t = l.title.toLowerCase();
  if (t.includes('gitops')) return 'Git is the change request and the audit log; a controller continuously compares that declared state with the cluster and corrects drift. Operators change Git, not live objects by hand.';
  if (t.includes('docker') || t.includes('container')) return 'A container packages a process and its runtime dependencies, but it is not a tiny virtual machine. Images are immutable build outputs; containers are disposable runtime instances.';
  if (t.includes('kubernetes') || t.includes('k8s')) return 'Kubernetes is a reconciliation system. You declare what should exist, controllers compare that intent with reality, and the control plane keeps working to close the gap.';
  if (t.includes('terraform')) return 'Terraform turns infrastructure into reviewed code. The configuration declares intent, the state maps that intent to real objects, and the plan is the safety checkpoint before change.';
  if (t.includes('ansible')) return 'Ansible connects to managed machines and converges them toward a declared configuration. Good playbooks are idempotent: a second run should report little or no change.';
  if (t.includes('jenkins') || t.includes('github actions') || t.includes('ci/cd') || t.includes('pipeline')) return 'A delivery pipeline is an executable contract for moving a change toward users. Every stage should produce evidence, stop unsafe changes, and preserve a known rollback path.';
  if (t.includes('prometheus') || t.includes('grafana') || t.includes('observability') || t.includes('logging')) return 'Observability answers questions about a running system from its outputs. Metrics show trends, logs explain discrete events, and traces connect work across service boundaries.';
  if (t.includes('vault') || t.includes('secret')) return 'A secret should be delivered only to the workload that needs it, for the shortest practical lifetime. Central management adds policy, auditability, leasing, and rotation.';
  if (t.includes('aws') || t.includes('gcp') || t.includes('azure') || t.includes('cloud')) return 'Cloud resources are API-managed infrastructure with a shared-responsibility security model. Identity, network boundaries, cost controls, tagging, and automated cleanup matter as much as provisioning.';
  if (t.includes('security') || t.includes('selinux') || t.includes('apparmor') || t.includes('iam') || t.includes('pki')) return 'Security is a set of explicit trust boundaries, not a final scanner. Start with least privilege, reduce exposed surface, protect credentials, and retain evidence for investigation.';
  if (t.includes('network') || t.includes('dns') || t.includes('proxy') || t.includes('ingress')) return 'Follow one request from name lookup to route, connection, policy, listener, upstream and response. Testing each hop separately turns vague connectivity problems into small, provable questions.';
  if (t.includes('storage') || t.includes('lvm') || t.includes('raid') || t.includes('backup') || t.includes('postgresql') || t.includes('redis')) return 'Storage work is about the complete data lifecycle: allocation, permissions, persistence, consistency, capacity, backup and tested restoration—not merely creating a disk or database.';
  if (t.includes('bash') || t.includes('shell')) return 'A shell script is production code when operations depend on it. Quote variables, fail predictably, validate inputs, log decisions, make repeat runs safe, and expose a useful exit status.';
  if (t.includes('python')) return 'Python automation should transform explicit inputs into structured outputs while handling timeouts, partial failure and unexpected data. The reusable interface matters more than a one-off script.';
  if (t.includes('systemd') || t.includes('process')) return 'Linux runs work as processes; systemd describes how long-lived processes start, stop, restart and depend on other units. The journal connects service lifecycle events to diagnostic evidence.';
  if (t.includes('incident') || t.includes('troubleshooting')) return 'Troubleshooting is hypothesis-driven: establish impact, preserve evidence, compare healthy and unhealthy states, test the smallest theory, recover safely, then document the cause.';
  if (t.includes('capstone')) return 'This milestone adds one production capability to the same end-to-end service. The value is in integration: code, infrastructure, delivery, security and operations must agree on one reproducible contract.';
  if (t.includes('portfolio') || t.includes('branding') || t.includes('presentation')) return 'A strong engineering profile makes claims verifiable. Show the problem, design choice, working artifact, failure handled, measurable result and what you would improve next.';
  return `${l.title} becomes useful when you can connect its configuration to an observable result. Treat the lab as a small production change: define intent, control risk, verify behaviour and preserve evidence.`;
}

function toolsFor(l) {
  const t = l.title.toLowerCase();
  const tools = ['git'];
  const add = (...xs) => xs.forEach(x => { if (!tools.includes(x)) tools.push(x); });
  if (l.day <= 28) add('bash');
  if (t.includes('docker') || t.includes('compose') || (l.day >= 69 && l.day <= 83)) add('docker');
  if (t.includes('kubernetes') || t.includes('k8s') || t.includes('helm') || t.includes('gitops') || t.includes('argo') || t.includes('flux') || t.includes('mesh') || t.includes('cert-manager')) add('kubectl');
  if (t.includes('helm')) add('helm');
  if (t.includes('terraform') || t.includes('infrastructure')) add('terraform');
  if (t.includes('ansible')) add('ansible-playbook');
  if (t.includes('python') || t.includes('http automation')) add('python');
  if (t.includes('aws') || t.includes('eks')) add('aws');
  if (t.includes('gcp') || t.includes('gke')) add('gcloud');
  if (t.includes('azure') || t.includes('aks')) add('az');
  if (t.includes('prometheus')) add('promtool');
  if (t.includes('vault')) add('vault');
  return tools;
}

function labScript(l) {
  const commands = l.example.split('; ').join('\n#   ');
  const tools = toolsFor(l).join(' ');
  return `#!/usr/bin/env bash
set -Eeuo pipefail

# Safe helper for Day ${String(l.day).padStart(3, '0')}: ${l.title}
# It checks prerequisites and prints the lesson plan. It intentionally does not
# execute infrastructure-changing commands. Run those manually after review.

readonly DAY="${String(l.day).padStart(3, '0')}"
readonly TOPIC="${l.title}"
readonly REQUIRED_TOOLS="${tools}"

usage() {
  cat <<'USAGE'
Usage: bash lab.sh <check|plan|verify>

  check   report installed and missing command-line tools
  plan    print the reviewed command sequence without executing it
  verify  validate the project documentation and required directories
USAGE
}

check_tools() {
  local missing=0 tool
  for tool in $REQUIRED_TOOLS; do
    if command -v "$tool" >/dev/null 2>&1; then
      printf 'OK      %s\\n' "$tool"
    else
      printf 'MISSING %s\\n' "$tool"
      missing=1
    fi
  done
  return "$missing"
}

show_plan() {
  cat <<'PLAN'
Day ${String(l.day).padStart(3, '0')} — ${l.title}

Read and adapt these commands; do not paste them into production:

#   ${commands}

Workflow: discover -> plan -> validate -> apply -> observe -> recover -> clean up
PLAN
}

verify_project() {
  local base
  base="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
  local failed=0 file
  for file in README.md PROJECT-1.md PROJECT-2.md; do
    if [[ -s "$base/$file" ]]; then
      printf 'OK      %s\\n' "$file"
    else
      printf 'MISSING %s\\n' "$file"
      failed=1
    fi
  done
  return "$failed"
}

case "\${1:-}" in
  check) check_tools ;;
  plan) show_plan ;;
  verify) verify_project ;;
  *) usage; exit 2 ;;
esac
`;
}

function conceptText(term, title) {
  const friendly = term.replace(/\//g, ' and ');
  const t = term.toLowerCase();
  let meaning;
  if (/(log|metric|trace|telemetry|audit|journal|evidence|dashboard|alert)/.test(t))
    meaning = 'an observability signal: it turns internal behaviour into evidence that operators can query, correlate, and alert on';
  else if (/(secret|iam|identity|role|permission|sudo|policy|rbac|tls|pki|certificate|token|auth|security|privilege|capabilit|signing|provenance)/.test(t))
    meaning = 'a trust control: it defines who or what may act, under which conditions, and what evidence is retained';
  else if (/(network|route|port|dns|ingress|gateway|proxy|service discovery|packet|vpc|vnet|traffic|smtp|relay)/.test(t))
    meaning = 'part of the request path: it decides how traffic is addressed, transported, filtered, or forwarded';
  else if (/(storage|volume|mount|filesystem|disk|lvm|raid|lun|stateful|pv|pvc|backup|restore|persistence|retention)/.test(t))
    meaning = 'a data-lifecycle mechanism: it controls where data lives, how it survives restarts, and how it is recovered';
  else if (/(test|health|probe|validation|lint|scan|quality|acceptance|sli|slo|error budget)/.test(t))
    meaning = 'a verification mechanism: it converts an expectation into a repeatable pass/fail signal';
  else if (/(pipeline|workflow|reconciliation|automation|script|idempot|rollout|promotion|sync|deploy|apply|hook|handler)/.test(t))
    meaning = 'an automation mechanism: it moves a declared change through repeatable steps while exposing failures and rollback points';
  else if (/(process|container|pod|image|vm|hypervisor|node|replica|agent|runner|control plane)/.test(t))
    meaning = 'a runtime building block: it consumes resources, has a lifecycle, and must expose a healthy state';
  else if (/(config|desired state|manifest|chart|template|variable|input|output|schema|record|unit|profile|label)/.test(t))
    meaning = 'a declarative contract: it records intent so a tool or service can compare, validate, and enforce the required state';
  else if (/(failure|recovery|rollback|incident|troubleshoot|root cause|drift|resilience|rpo|rto)/.test(t))
    meaning = 'a reliability concern: it defines how an unhealthy state is detected, contained, explained, and reversed';
  else
    meaning = `a core operating concept in ${title}: understand its purpose, inputs, outputs, owner, normal signal, and failure signal`;
  return `**${friendly}** — ${meaning}. In the lab, observe it before and after one controlled change so the idea is tied to real evidence.`;
}

function notesFor(l) {
  const [p1, p2] = projectNames(l);
  const f = l.focus;
  return `# Day ${String(l.day).padStart(3, '0')} — ${l.title}

> Track: **${phaseFor(l.day)}** · Suggested study time: **90–150 minutes**

## Why this matters

${l.title} is part of the operational path from a developer commit to a reliable production service. Today's goal is to understand the system, practise the normal workflow, deliberately observe one failure, and leave reproducible evidence in Git.

## In plain English

${plainEnglishFor(l)}

\`\`\`mermaid
flowchart LR
    A[${f[0]}] --> B[${f[1]}]
    B --> C[${f[2]}]
    C --> D[${f[3]}]
    D --> E[Evidence and feedback]
\`\`\`

## Learning outcomes

By the end of the day you should be able to:

- describe ${f[0]} and ${f[1]} in plain language;
- use ${f[2]} and ${f[3]} in a small working lab;
- validate the result with evidence instead of assuming success;
- recognise one common failure and return safely to the previous state.

## Core ideas

${f.map(x => `- ${conceptText(x, l.title)}`).join('\n')}

The useful mental model is **desired state → action → observed state → evidence**. Write down what you expect before each change. After the change, check the service from both the operator's view and the user's view. A command returning zero is useful evidence, but a real request, metric, log entry, or restored file is stronger.

## Lab setup and safety

${contextFor(l.day)}

1. Record the starting state and tool versions.
2. Make the smallest possible change.
3. Run a syntax or dry-run check where the tool supports it.
4. Apply the change and observe logs/events while it happens.
5. Test the happy path and one negative path.
6. Revert or clean up, then repeat from the README to prove reproducibility.

## Worked example

Run the following as a starting point, adapting names and addresses to your lab:

\`\`\`bash
${l.example.split('; ').join('\n')}
\`\`\`

Before running privileged or destructive operations, read the help page and confirm the target. Save relevant output in a text file under an \`evidence/\` directory, but redact tokens, passwords, private keys, public IPs, and personal data.

The project directory includes a safe helper. It checks tools and prints the plan, but never runs infrastructure-changing commands automatically:

\`\`\`bash
bash project/lab.sh check
bash project/lab.sh plan
bash project/lab.sh verify
\`\`\`

## Practical workflow

- **Discover:** inspect the current state without modifying it.
- **Plan:** state the intended result, risks, and rollback.
- **Implement:** keep configuration declarative and version-controlled where possible.
- **Verify:** test syntax, behaviour, logs, and the user-facing endpoint.
- **Break safely:** introduce one controlled error related to ${f[0]} or ${f[2]}.
- **Recover:** use the evidence to diagnose, roll back, and document the root cause.

## Project 1 — ${p1}

Build a clean lab that demonstrates all four concepts: **${f.join('**, **')}**.

**Required deliverables**

- a short architecture diagram or request-flow sketch;
- version-controlled configuration or automation;
- a README with prerequisites, exact run steps, validation, and cleanup;
- captured evidence showing a successful result;
- a troubleshooting note for one mistake you actually tested.

**Acceptance test:** another person can start from a clean machine, follow only your README, run the validation command, and get the documented result.

## Project 2 — ${p2}

Turn the first lab into an operations exercise. Add automation, deliberately create a failure around **${f[1]}**, and diagnose it without random changes. Add a health check or measurable signal, a rollback step, and a short incident timeline.

**Definition of done**

- secrets and machine-specific values are not committed;
- repeated execution is safe or its side effects are clearly documented;
- the negative test fails for the expected reason;
- rollback restores the original service;
- cleanup leaves no unexpected process, container, cloud resource, mount, or credential.

## Review questions

1. How would you explain ${f[0]} to a developer who has not operated production systems?
2. Which signal proves ${f[1]} is healthy?
3. What is the safest rollback if ${f[2]} fails halfway through?
4. Which part should be automated next, and what new risk would that automation introduce?

## Completion checklist

- [ ] I can explain the four core ideas without reading the notes.
- [ ] I ran the worked example and saved redacted evidence.
- [ ] Project 1 passes from a clean start.
- [ ] Project 2 includes failure, diagnosis, recovery, and cleanup.
- [ ] I committed notes using a meaningful message and linked the evidence.

## Further reading

- Use the official documentation for the named tool or service as the source of truth.
- Use local manual pages (\`man\`, \`--help\`) for the exact installed version.
- Re-check cloud pricing, security guidance, and release notes before using the lab in production.
`;
}

function projectIndex(l) {
  const [p1, p2] = projectNames(l);
  return `# Day ${String(l.day).padStart(3, '0')} Projects — ${l.title}

This day has two assessed projects. Full requirements and acceptance criteria are in [the lesson](../notes.md).

1. [Project 1 — ${p1}](PROJECT-1.md)
2. [Project 2 — ${p2}](PROJECT-2.md)

Use \`bash lab.sh check\` for prerequisites, \`bash lab.sh plan\` to review the example, and \`bash lab.sh verify\` before committing.

Keep screenshots and command output in a local \`evidence/\` directory. Redact secrets and personal data before committing.
`;
}

function projectFile(l, number) {
  const names = projectNames(l);
  const production = number === 2;
  return `# Project ${number} — ${names[number - 1]}

## Scenario

${production ? `A working ${l.title} lab now needs production-style failure handling, repeatability, and evidence.` : `Create a repeatable implementation of ${l.title} in a disposable lab.`}

## Requirements

${production ? `- start from Project 1 and automate the repeatable steps;
- introduce a controlled failure involving **${l.focus[1]}**;
- diagnose using logs, status, events, metrics, or packet/process evidence;
- add a health check, rollback, cleanup, and short incident timeline;
- rerun the recovery to prove it was not accidental.` : `- demonstrate **${l.focus.join('**, **')}**;
- keep code and configuration under version control;
- include prerequisites, setup, validation, and cleanup commands;
- test the normal path plus one incorrect input;
- save redacted evidence of the final result.`}

## Suggested sequence

1. Write the expected outcome and a simple diagram.
2. Capture the starting state and versions.
3. Implement one small change at a time.
4. Validate syntax before applying where supported.
5. Verify from the operator and user perspectives.
6. Remove the lab and rebuild it from the README.

## Acceptance criteria

- [ ] A clean machine or namespace can reproduce the result.
- [ ] Validation is objective and includes the relevant command output.
- [ ] No password, token, private key, or personal data is committed.
- [ ] Failure and rollback behaviour are documented.
- [ ] Cleanup is safe and complete.

## Reflection

Record what failed, the evidence that led to the cause, the final fix, and what you would monitor in production.
`;
}

const dayDirs = fs.readdirSync(root, { withFileTypes: true })
  .filter(d => d.isDirectory() && /^Day-\d{3}_/.test(d.name))
  .reduce((m, d) => { m[Number(d.name.slice(4, 7))] = path.join(root, d.name); return m; }, {});

for (const l of lessons) {
  const dir = dayDirs[l.day];
  if (!dir) throw new Error(`Missing folder for day ${l.day}`);
  fs.writeFileSync(path.join(dir, 'notes.md'), notesFor(l), 'utf8');
  const projectDir = path.join(dir, 'project');
  fs.mkdirSync(projectDir, { recursive: true });
  fs.writeFileSync(path.join(projectDir, 'README.md'), projectIndex(l), 'utf8');
  fs.writeFileSync(path.join(projectDir, 'PROJECT-1.md'), projectFile(l, 1), 'utf8');
  fs.writeFileSync(path.join(projectDir, 'PROJECT-2.md'), projectFile(l, 2), 'utf8');
  fs.writeFileSync(path.join(projectDir, 'lab.sh'), labScript(l), { encoding: 'utf8', mode: 0o755 });
}

const indexRows = lessons.map(l => {
  const folder = path.basename(dayDirs[l.day]);
  return `| ${l.day} | [${l.title}](${folder}/notes.md) | [Project 1](${folder}/project/PROJECT-1.md) · [Project 2](${folder}/project/PROJECT-2.md) |`;
}).join('\n');

const guide = `# Complete 114-Day DevOps Roadmap with Morteza

This edition completes every day of the original roadmap and preserves the repository's earlier long-form notes and working assets. Each canonical \`notes.md\` contains a plain-English explanation, Mermaid flow diagram, concepts, a worked example, a safe lab workflow, review questions, and two assessed projects. Every project directory also includes a non-destructive \`lab.sh\` helper for prerequisites, planning and documentation checks.

## How to use the roadmap

1. Work through one day at a time; do not copy commands without understanding the target.
2. Complete both projects and keep redacted evidence.
3. Commit daily with a clear message such as \`day-035: containerise sample app\`.
4. Use a disposable lab and clean up cloud resources immediately after validation.
5. Treat official documentation and the installed version's help pages as authoritative.

| Day | Lesson | Projects |
|---:|---|---|
${indexRows}

## Portfolio standard

A completed day is more than a checked box. It includes reproducible code/configuration, a diagram, objective validation, one controlled failure, a rollback, cleanup, and a short reflection. Never publish secrets, private infrastructure details, employer data, or unredacted screenshots.
`;
fs.writeFileSync(path.join(root, 'COMPLETE_114_DAY_GUIDE.md'), guide, 'utf8');

const manifest = {
  generatedAt: new Date().toISOString(),
  days: lessons.length,
  lessons: lessons.map(l => ({ day: l.day, title: l.title, projects: 2 }))
};
fs.writeFileSync(path.join(root, 'roadmap', 'curriculum.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');

console.log(`Generated ${lessons.length} lessons and ${lessons.length * 2} project briefs.`);

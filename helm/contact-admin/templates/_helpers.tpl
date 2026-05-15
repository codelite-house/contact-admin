{{- define "contact-admin.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "contact-admin.labels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
app.kubernetes.io/name: contact-admin
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "contact-admin.selectorLabels" -}}
app.kubernetes.io/name: contact-admin
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

#!/usr/bin/env bash
set -euo pipefail
LOG="/var/log/backup-sync.log"
TMPDIR="$(mktemp -d)"
RECIPIENT="backup@yourdomain.local"
REMOTE="backup@192.168.56.50:/data/backups/"

log(){ echo "$(date --iso-8601=seconds) - $*" | tee -a "$LOG"; }

SRC="/var/www/html"
ARCHIVE="$TMPDIR/www-$(date +%F).tar.gz"

log "Starting backup for $SRC -> $ARCHIVE"
tar -C / -czf "$ARCHIVE" "${SRC#/}" 
log "Archive created, encrypting for $RECIPIENT"
gpg --output "$ARCHIVE.gpg" --encrypt --recipient "$RECIPIENT" "$ARCHIVE"
log "Encrypted. Transferring to remote: $REMOTE"
rsync -avz --remove-source-files "$ARCHIVE.gpg" "$REMOTE" >>"$LOG" 2>&1
log "Backup finished successfully."

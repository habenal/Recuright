#!/usr/bin/env bash
set -e

HOST="$1"
shift
CMD="$@"

echo "Waiting for $HOST..."

until nc -z $(echo $HOST | cut -d: -f1) $(echo $HOST | cut -d: -f2); do
  echo "Database not ready..."
  sleep 2
done

echo "Database is UP"

exec $CMD

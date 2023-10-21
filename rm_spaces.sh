for f in RData/Stage*; do mv "$f" "${f// /}"; done
for f in RData/Stage*/**; do mv "$f" "${f// /}"; done
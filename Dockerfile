FROM node:24-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_MAIN_API_BASE_URL
ENV NEXT_PUBLIC_MAIN_API_BASE_URL=${NEXT_PUBLIC_MAIN_API_BASE_URL}
ARG NEXT_PUBLIC_REQUESTOR_API_BASE_URL
ENV NEXT_PUBLIC_REQUESTOR_API_BASE_URL=${NEXT_PUBLIC_REQUESTOR_API_BASE_URL}

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nextjs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next ./.next
COPY --from=builder --chown=nextjs:nextjs /app/next.config.ts ./next.config.ts
COPY --from=builder --chown=nextjs:nextjs /app/tsconfig.json ./tsconfig.json

USER nextjs

EXPOSE 3000

ENV HOSTNAME=0.0.0.0
ENV PORT=3000

CMD ["npx", "next", "start"]

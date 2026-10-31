"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import MainAPINotFoundError from "@/api/main/errors/not-found-error";
import PublicGuildmateErrorState from "@/app/(public)/guildmates/_components/public-guildmate-error-state";
import PublicGuildmateAdventurerCard from "@/app/(public)/guildmates/[slug]/_components/public-guildmate-adventurer-card";
import PublicGuildmateAdventurerCardBack from "@/app/(public)/guildmates/[slug]/_components/public-guildmate-adventurer-card-back";
import { getCardNumber } from "@/app/(public)/guildmates/[slug]/_utils/public-guildmate-detail-helper";
import PublicGuildmateAdventurerCardSkeleton from "@/app/(public)/guildmates/[slug]/_components/public-guildmate-adventurer-card-skeleton";
import PublicGuildmatePrintButton from "@/app/(public)/guildmates/[slug]/_components/public-guildmate-print-button";
import PublicGuildmateStoriesSection from "@/app/(public)/guildmates/[slug]/_components/public-guildmate-stories-section";
import { useGetPublicGuildmateByIdentifier } from "@/app/(public)/guildmates/[slug]/_hooks/use-get-public-guildmate-by-identifier";
import { useT } from "@/app/_hooks/use-t";
import { GUILDMATE_DETAIL_MESSAGES } from "@/app/(public)/guildmates/[slug]/_messages";

export default function PublicGuildmateDetailPageClient() {
  const { t } = useT(GUILDMATE_DETAIL_MESSAGES);
  // Username URL; the API also accepts the id
  const { slug } = useParams();
  const identifier = decodeURIComponent(slug as string);
  const guildmateQuery = useGetPublicGuildmateByIdentifier(identifier);
  const guildmate = guildmateQuery.data?.data?.data;
  const isNotFound =
    guildmateQuery.isError &&
    guildmateQuery.error instanceof MainAPINotFoundError;

  useEffect(() => {
    if (isNotFound) {
      notFound();
    }
  }, [isNotFound]);

  return (
    <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-10 lg:px-10">
      <Button
        variant="ghost"
        size="sm"
        className="self-start print:hidden"
        render={<Link href="/guildmates" />}
        nativeButton={false}
      >
        <ArrowLeft /> {t("detail.backToRoll")}
      </Button>

      <If condition={guildmateQuery.isLoading}>
        <Then>
          <div className="flex justify-center">
            <PublicGuildmateAdventurerCardSkeleton />
          </div>
        </Then>
        <Else>
          <If condition={!!guildmate}>
            <Then>
              {guildmate && (
                <>
                  <div className="flex flex-col items-center gap-4">
                    {/* Print root: front prints on page 1, back (print-only) on page 2 */}
                    <div data-print-root className="flex w-full justify-center">
                      <PublicGuildmateAdventurerCard guildmate={guildmate} />
                      <PublicGuildmateAdventurerCardBack
                        cardNumber={getCardNumber(guildmate.id)}
                      />
                    </div>
                    <div className="print:hidden">
                      <PublicGuildmatePrintButton />
                    </div>
                  </div>

                  <If condition={!!guildmate.bio?.trim()}>
                    <Then>
                      <section className="mx-auto flex w-full max-w-2xl flex-col gap-2 text-center print:hidden">
                        <h2 className="font-heading text-xl">
                          {t("detail.adventurersTale")}
                        </h2>
                        <p className="whitespace-pre-line text-foreground/80">
                          {guildmate.bio}
                        </p>
                      </section>
                    </Then>
                  </If>
                </>
              )}
            </Then>
            <Else>
              <If condition={guildmateQuery.isError && !isNotFound}>
                <Then>
                  <PublicGuildmateErrorState
                    title={t("error.detailTitle")}
                    description={t("error.detailDescription")}
                    onRetry={() => guildmateQuery.refetch()}
                  />
                </Then>
              </If>
            </Else>
          </If>
        </Else>
      </If>

      {/* Loads on its own; hidden once the guildmate fails (error or not found) */}
      <If condition={!!guildmate || !guildmateQuery.isError}>
        <Then>
          <PublicGuildmateStoriesSection identifier={identifier} />
        </Then>
      </If>
    </div>
  );
}

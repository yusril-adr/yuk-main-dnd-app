import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Skeleton } from "@/app/_components/ui/skeleton";
import dayjs from "@/libs/dayjs";
import type { TRoleResponse } from "@/api/main/modules/master/iam/roles/types/role-response";

type TRoleDetailProps = {
  role: TRoleResponse | undefined;
  isLoading: boolean;
};

export default function RoleDetail({ role, isLoading }: TRoleDetailProps) {
  const renderValue = (value: string | undefined) => {
    if (isLoading) {
      return <Skeleton className="h-6 w-full" />;
    }

    return value || "-";
  };

  return (
    <Card>
      <CardContent className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableHead className="w-1/3 border bg-secondary px-4 py-6">
                Key
              </TableHead>
              <TableCell className="border px-4 py-6">
                {renderValue(role?.key)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="border bg-secondary px-4 py-6">
                Name
              </TableHead>
              <TableCell className="border px-4 py-6">
                {renderValue(role?.name)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="border bg-secondary px-4 py-6">
                Description
              </TableHead>
              <TableCell className="border px-4 py-6 whitespace-normal break-words">
                {renderValue(role?.description)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="border bg-secondary px-4 py-6">
                Created At
              </TableHead>
              <TableCell className="border px-4 py-6">
                {isLoading
                  ? <Skeleton className="h-6 w-full" />
                  : dayjs(role?.created_at).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="border bg-secondary px-4 py-6">
                Updated At
              </TableHead>
              <TableCell className="border px-4 py-6">
                {isLoading
                  ? <Skeleton className="h-6 w-full" />
                  : dayjs(role?.updated_at).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div>
          <h2 className="mb-3 font-heading text-lg">Permissions</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Key</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && !role?.permissions?.length && (
                <TableRow>
                  <TableCell colSpan={3}>No permissions assigned.</TableCell>
                </TableRow>
              )}
              {!isLoading &&
                role?.permissions?.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>{permission.module}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{permission.action}</Badge>
                    </TableCell>
                    <TableCell>{permission.key}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../ui/breadcrumb';

import { mockedRequests } from '@/lib/mock';

const MAX_VISIBLE_SEGMENTS = 3;

export const generateBreadcrumbs = ({ pathname }: { pathname: string }) => {
  const segments = pathname.split('/').filter(Boolean);
  const shouldUseEllipsis = segments.length > MAX_VISIBLE_SEGMENTS;

  const breadcrumbItems: React.ReactNode[] = [];

  breadcrumbItems.push(
    <BreadcrumbItem key="home">
      <BreadcrumbLink href="/">Menu</BreadcrumbLink>
    </BreadcrumbItem>
  );

  if (segments.length > 0) {
    breadcrumbItems.push(<BreadcrumbSeparator key="sep-home" />);
  }

  if (shouldUseEllipsis) {
    const firstSegment = segments[0];
    let firstDisplayText = firstSegment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

    breadcrumbItems.push(
      <BreadcrumbItem key={`/${firstSegment}`}>
        <BreadcrumbLink href={`/${firstSegment}`}>{firstDisplayText}</BreadcrumbLink>
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep-first" />,
      <BreadcrumbItem key="ellipsis">
        <BreadcrumbEllipsis />
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep-ellipsis" />
    );

    segments.slice(-2).forEach((segment, idx, arr) => {
      processSegment({
        segment,
        idx: segments.length - arr.length + idx,
        segments,
        breadcrumbItems,
        accumulatedPath: ''
      });
    });
  } else {
    let path = '';
    segments.forEach((segment, idx) => {
      processSegment({
        segment,
        idx,
        segments,
        breadcrumbItems,
        accumulatedPath: path
      });
      path += `/${segment}`;
    });
  }

  return breadcrumbItems;
};

const processSegment = ({
  segment,
  idx,
  segments,
  breadcrumbItems,
  accumulatedPath = ''
}: {
  segment: string;
  idx: number;
  segments: string[];
  breadcrumbItems: React.ReactNode[];
  accumulatedPath: string;
}) => {
  const path = accumulatedPath + `/${segment}`;

  let displayText = segment;

  if (segment === 'user' || segment === 'customer' || segment === 'requests') {
    displayText = 'Requests';
  } else if (segments[0] === 'requests') {
    if (segment === 'create-request') {
      displayText = 'Create Request';
    } else if (segment === 'create-feature') {
      displayText = 'Create Feature';
    } else if (idx === 1 && !['create-request', 'create-feature'].includes(segment)) {
      const requestId = segment;
      const request = mockedRequests.find((req) => req.id === requestId);
      if (request) {
        displayText = request.name;
      }
    }
  } else {
    displayText = segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }

  breadcrumbItems.push(
    <BreadcrumbItem key={path}>
      {idx === segments.length - 1 ? (
        <BreadcrumbPage>{displayText}</BreadcrumbPage>
      ) : (
        <BreadcrumbLink href={path}>{displayText}</BreadcrumbLink>
      )}
    </BreadcrumbItem>
  );

  if (idx < segments.length - 1) {
    breadcrumbItems.push(<BreadcrumbSeparator key={`sep-${path}`} />);
  }
};

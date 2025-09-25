interface DateFormatProps {
  fromDate?: string;
  toDate?: string;
}

const DateFormat: React.FC<DateFormatProps> = ({ fromDate, toDate }) => {
  const formatDate = (dateStr?: string) => {
    const date = dateStr ? new Date(dateStr) : new Date();
    if (isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const today = new Date();

  let from = fromDate ? new Date(fromDate) : undefined;
  let to = toDate ? new Date(toDate) : undefined;

  if (!from && !to) {
    from = today;
    to = today;
  }

  if (!from && to) {
    from = to;
  }

  if (from && !to) {
    to = today;
  }

  if (from && to && to < from) {
    to = from;
  }

  return (
    <>
      {formatDate(from?.toISOString())} - {formatDate(to?.toISOString())}
    </>
  );
};

export default DateFormat;

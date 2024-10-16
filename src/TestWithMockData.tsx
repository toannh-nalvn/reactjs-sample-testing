type TestWithMockDataProps = {
  data: any[];
  displayUnorderedList: boolean;
  handleClick: () => void;
};

const TestWithMockData = ({
  data,
  displayUnorderedList,
  handleClick,
}: TestWithMockDataProps) => {
  return (
    <div>
      {displayUnorderedList ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.id}
              {item.first_name},{item.last_name},
              <a
                onClick={() => {
                  console.log("email link clicked");
                  handleClick();
                }}
              >
                {item.email}
              </a>
              <span>{item.age > 50 ? "Senior" : "Not senior"}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ol>
          {data.map((item) => (
            <li key={item.id}>Last name: {item.last_name}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default TestWithMockData;

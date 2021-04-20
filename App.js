import { useEffect, useState, useRef } from "react";
import "./styles.css";

function useInterval(callback, delay, clear) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay, clear]);
}

// to fetch photos
// https://jsonplaceholder.typicode.com/photos

export default function App() {
  const [data, setData] = useState();
  const [current, setCurrent] = useState();
  const [show, setShow] = useState();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data.splice(0, 10));
        setCurrent(0);
      });
  }, []);

  // useInterval(
  //   () => {
  //     show && setCurrent(current === data.length - 1 ? 0 : current + 1);
  //   },
  //   2000,
  //   show
  // );

  useEffect(() => {
    let t;
    console.log(show);
    if (show) {
      t = setInterval(() => {
        setCurrent((c) => (c === data.length - 1 ? 0 : c + 1));
      }, 2000);
    } else {
      clearInterval(t);
    }
    return () => {
      clearInterval(t);
    };
  }, [show]);

  const dd = () => {};
  return (
    <div className="App">
      <h1>GoPicgram</h1>
      <h2>Story carousel!</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "20px"
        }}
      >
        {data &&
          data.map((x, index) => {
            return (
              <div
                style={{
                  borderRadius: 5,
                  width: "20px",
                  height: "6px",
                  backgroundColor: index <= current ? "red" : "grey",
                  marginRight: "10px"
                }}
              ></div>
            );
          })}
      </div>
      {current >= 0 ? (
        <img
          onClick={() => setShow(!show)}
          src={data[current]?.url}
          width={300}
          height={300}
        />
      ) : null}
    </div>
  );
}

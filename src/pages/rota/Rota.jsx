import React, { useEffect, useState } from "react";
// Styles
import styles from "./Rota.module.css";
// Utils
import { getCurrentSunday, formatDate } from "../../utils/dateUtils";
import {
  formatName,
  extractShiftTime,
  timeToMinutes,
} from "../../utils/miscUtils";
// Parsing
import Papa from "papaparse";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Rota = () => {
  // State variables
  const [employees, setEmployees] = useState([]);
  const [dayHeaders, setDayHeaders] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [currentWeekStart, setCurrentWeekStart] = useState(getCurrentSunday());

  // Rota CSV file
  const rotaFileName = `data/Wall_Schedule_Classic_Review_6departments_(Week_${formatDate(
    currentWeekStart
  )}).csv`;

  // Load and parse CSV file
  useEffect(() => {
    const parseRota = async () => {
      try {
        const text = await fetch(rotaFileName).then((res) => {
          if (!res.ok) throw new Error(`File not found: ${rotaFileName}`);
          return res.text();
        });

        const { data } = Papa.parse(text, { header: false });
        const headerRow = data.find((row) => row[0] === "Employee");
        if (!headerRow) return;

        // Make formatted section headers ("Mon (12/10)" etc)
        setDayHeaders(
          headerRow.slice(1, 8).map((day) => day.replace("(", " ("))
        );

        setEmployees(
          data
            .slice(4) // Skip top irrelevant rows of CSV file
            .map((row) => ({
              name: formatName(row[0]),
              shifts: row.slice(1, 8),
            }))
        );
      } catch (error) {
        console.error(error);
        setEmployees([]);
        setDayHeaders([]);
      }
    };

    parseRota();
  }, [rotaFileName]);

  // Rota form limits
  const minWeekStart = new Date(2025, 9, 19); // 19 Oct 2025
  const maxWeekStart = (() => {
    const d = getCurrentSunday();
    d.setDate(d.getDate() + 14); // 2 weeks ahead
    return d;
  })();

  // Navigation
  const handlePrev = (e) => {
    e.preventDefault();
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() - 7);
    if (newDate >= minWeekStart) setCurrentWeekStart(newDate);
  };

  const handleNext = (e) => {
    e.preventDefault();
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + 7);
    if (newDate <= maxWeekStart) setCurrentWeekStart(newDate);
  };

  const prevDisabled = currentWeekStart.getTime() <= minWeekStart.getTime();
  const nextDisabled = currentWeekStart.getTime() >= maxWeekStart.getTime();

  return (
    <div>
      <h1>Rota</h1>

      <section className={styles.wipWarning}>
        ⚠️ Work in progress. Don't rely on me. Continue to use Logile and only
        use me as a reference. ⚠️
      </section>

      <section>
        <Form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.weekForm}>
            <Button onClick={handlePrev} disabled={prevDisabled}>
              <i className="fas fa-arrow-left"></i> Prev
            </Button>
            <strong>{currentWeekStart.toLocaleDateString()}</strong>
            <Button onClick={handleNext} disabled={nextDisabled}>
              Next <i className="fas fa-arrow-right"></i>
            </Button>
          </div>

          <div className={styles.empForm}>
            <Form.Select
              onChange={(e) => setSelectedEmp(e.target.value)}
              value={selectedEmp}
            >
              <option value="">Everyone</option>
              {employees.slice(2).map((emp, i) => (
                <option key={i}>{emp.name}</option>
              ))}
            </Form.Select>
          </div>
        </Form>
      </section>

      {dayHeaders.map((day, dayIndex) => {
        const shifts = employees
          .filter((e) => !selectedEmp || e.name === selectedEmp)
          .map((e) => {
            const shift = extractShiftTime(e.shifts[dayIndex]);
            if (!shift) return null;

            // "start" to help sort by start time
            const [startStr] = shift.split("–");
            const start = timeToMinutes(startStr);
            if (isNaN(start)) return null;

            return { name: e.name, shift, start };
          })
          .filter(Boolean)
          .sort((a, b) => a.start - b.start);

        if (!shifts.length)
          return (
            <section>
              <h2>{day}</h2>
              <span>No shift today</span>
            </section>
          );

        return (
          <section key={day}>
            <h2>{day}</h2>
            <table className={styles.dayTable}>
              <tbody>
                {shifts.map(({ name, shift }, i) => (
                  <tr key={i}>
                    <td className={styles.nameTd}>{name}</td>
                    <td className={styles.shiftTimeTd}>{shift}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      })}
    </div>
  );
};

export default Rota;

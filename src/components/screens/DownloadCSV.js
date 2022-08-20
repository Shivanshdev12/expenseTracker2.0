import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../UI/Button';

const DownloadCSV = (props) => {
    const isActivated = useSelector(state => state.theme.isActivated);
    const bgColor = useSelector(state => state.theme.bgColor);
    function makeCSV(rows) {
        let main = [["Id", "Category", "Description", "Expense"]];
        for (let i = 0; i < rows.length; i++) {
            let arr = [];
            for (let [key, value] of Object.entries(rows[i])) {
                arr.push(value);
            }
            main.push(arr);
        }
        return main.map(row => row.join(",")).join("\n");
    }
    const blob = new Blob([makeCSV(props.data)]);
    const t = URL.createObjectURL(blob);
    return (
        <React.Fragment>
            {isActivated && <Button className={bgColor === false ? "btn-primary mb" : "btn-primary mb"}><a href={t} id="download" download="data.csv">Download as CSV</a></Button>}
        </React.Fragment>
    );
}

export default DownloadCSV;
import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, sortByCategory, setStartDate, setEndDate, setCategory } from '../actions/filters';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import getCategories from '../selectors/categories';
import moment from 'moment';
import DatePickerCancel from './DatePickerCancel';
import DatePickerCalender from './DatePickerCalender';

export class ExpenseFilters extends React.Component {

    state = {
        calenderFocused: null,
        date: [moment(this.props.filters.startDate).toDate(), moment(this.props.filters.endDate).toDate()]
    };

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onCalenderChange = (date) => {
        this.setState({ date }, this.onDatesChange({
            startDate: date ? moment(date[0]) : null,
            endDate: date? moment(date[1]) : null
        }))
    }

    onFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused }));
    };

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }

    onSortChange = (e) => {
        if (e.target.value === "date") {
            this.props.sortByDate();
        } else if (e.target.value === "amount") {
            this.props.sortByAmount();
        } else if (e.target.value === "category") {
            this.props.sortByCategory();
        }
    }

    onCategoryChange = (e) => {
        const category = e.target.value;
        this.props.setCategory(category);
    }

    render() {
        return (
            <div className="content-container--alt">
                <div className="input-group">
                    <div className={this.props.theme === "dark" ? "input-group__item--dark" : "input-group__item"}>
                        <input className="text-input" type="text" placeholder="Search Expenses" value={this.props.filters.text} onChange={this.onTextChange} />
                    </div>
                    <div className={this.props.theme === "dark" ? "input-group__item--dark" : "input-group__item"}>
                        <select className="select" value={this.props.filters.sortBy} onChange={this.onSortChange}>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                            <option value="category">Category</option>
                        </select>
                    </div>
                    <div className={this.props.theme === "dark" ? "input-group__item--dark" : "input-group__item"}>
                        <select className="select" value={this.props.filters.category} onChange={this.onCategoryChange}>
                            <option value="">All Categories</option>
                            {
                                this.props.categories.map((category) => {
                                    return <option key={category.name} value={category.id} >{category.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="input-group ">
                    <div className={this.props.theme === "dark" ? "input-group__item--dark input-group__item--home" : "input-group__item input-group__item--home"}>
                        <DateRangePicker
                            onChange={this.onCalenderChange}
                            value={this.state.date}
                            clearIcon={<DatePickerCancel theme={this.props.theme}/>}
                            calendarClassName={this.props.theme === "dark" ? "calender-dark" : ""}
                            calenderType="ISO 8601"
                            className={this.props.theme === "dark" ? "calender-background" : "calender-background--light"}
                            calendarIcon={<DatePickerCalender theme={this.props.theme}/>}
                        />
                    </div>
                </div>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        categories: getCategories(state.settings.defaultCategories, state.settings.userCategories),
        theme: state.settings.theme
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTextFilter: (text) => dispatch(setTextFilter(text)),
        sortByDate: () => dispatch(sortByDate()),
        sortByAmount: () => dispatch(sortByAmount()),
        sortByCategory: () => dispatch(sortByCategory()),
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate)),
        setCategory: (category) => dispatch(setCategory(category))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFilters);

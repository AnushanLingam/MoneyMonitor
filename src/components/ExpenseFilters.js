import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, sortByCategory, setStartDate, setEndDate, setCategory } from '../actions/filters';
import { DateRangePicker } from 'react-dates';
import getCategories from '../selectors/categories';


export class ExpenseFilters extends React.Component {

    state = {
        calenderFocused: null
    };

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

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
                    <div className="input-group__item">
                        <input className="text-input" type="text" placeholder="Search Expenses" value={this.props.filters.text} onChange={this.onTextChange} />
                    </div>
                    <div className="input-group__item">
                        <select className="select" value={this.props.filters.sortBy} onChange={this.onSortChange}>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                            <option value="category">Category</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <select className="select" value={this.props.filters.category} onChange={this.onCategoryChange}>
                            <option value="">All Categories</option>
                            {
                                this.props.categories.map((category) => {
                                    return <option key={category.name} value={category.name} >{category.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="input-group ">
                    <div className="input-group__item input-group__item-home">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calenderFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            showClearDates={true}
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
        categories: getCategories(state.settings.defaultCategories, state.settings.userCategories)
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


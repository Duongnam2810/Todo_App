import { FILTER_TYPES, type TodoFilterProps } from "../../types/interface"

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter, searchText, setSearchText }) => {

  const filterTypes = [
    { key: FILTER_TYPES.ALL, label: 'All' },
    { key: FILTER_TYPES.COMPLETED, label: 'Completed' },
    { key: FILTER_TYPES.ACTIVE, label: 'Active' },
  ];

  return (
    <div className="filter-container icons">
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="filter-buttons">
        {filterTypes.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`filter-btn ${filter === key ? 'active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilter
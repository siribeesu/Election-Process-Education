// Performance Optimization Guide for Election Hub Components
// This file contains best practices for React.memo and performance optimization

import React, { memo, useMemo, useCallback } from 'react';

/**
 * WHEN TO USE React.memo
 * 
 * 1. Components that render frequently but have same props
 * 2. Heavy components with expensive computations
 * 3. Large lists or data visualizations
 * 4. Components that receive simple props (primitives, not objects)
 * 
 * DO NOT USE if:
 * - Component receives inline objects or functions as props
 * - Props change on every render
 * - Premature optimization (measure first!)
 */

// Example 1: Memoizing a simple component
interface CardProps {
  title: string;
  description: string;
  onClick: () => void;
}

function SimpleCard({ title, description, onClick }: CardProps) {
  return (
    <div onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export const MemoizedSimpleCard = memo(SimpleCard);

// Example 2: Memoizing with custom comparison
interface DataGridProps {
  data: any[];
  onRowClick: (row: any) => void;
}

function DataGrid({ data, onRowClick }: DataGridProps) {
  return (
    <table>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} onClick={() => onRowClick(row)}>
            <td>{row.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Custom comparison function - only re-render if data length changes
export const MemoizedDataGrid = memo(DataGrid, (prevProps, nextProps) => {
  // Return true if props are equal (DON'T re-render)
  // Return false if props are different (DO re-render)
  return prevProps.data.length === nextProps.data.length;
});

// Example 3: Using useMemo for expensive calculations
interface StatisticsProps {
  numbers: number[];
}

function Statistics({ numbers }: StatisticsProps) {
  // Without useMemo: average recalculated on every render
  // With useMemo: only recalculated when 'numbers' dependency changes
  const average = useMemo(() => {
    console.log('Computing average...');
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  }, [numbers]);

  const median = useMemo(() => {
    console.log('Computing median...');
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }, [numbers]);

  return (
    <div>
      <p>Average: {average}</p>
      <p>Median: {median}</p>
    </div>
  );
}

export const MemoizedStatistics = memo(Statistics);

// Example 4: Using useCallback to memoize event handlers
interface FormProps {
  onSubmit: (formData: any) => void;
}

function Form({ onSubmit }: FormProps) {
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      onSubmit(Object.fromEntries(formData));
    },
    [onSubmit]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
    </form>
  );
}

export const MemoizedForm = memo(Form);

// Example 5: List item optimization (common pattern)
interface ListItemProps {
  id: string;
  title: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function ListItem({ id, title, isSelected, onSelect }: ListItemProps) {
  // Wrap callback to maintain referential equality
  const handleClick = useCallback(() => {
    onSelect(id);
  }, [id, onSelect]);

  return (
    <li
      onClick={handleClick}
      className={isSelected ? 'selected' : ''}
    >
      {title}
    </li>
  );
}

export const MemoizedListItem = memo(ListItem);

// Example 6: List container that passes optimized callback
interface ListProps {
  items: Array<{ id: string; title: string }>;
}

function List({ items }: ListProps) {
  const [selected, setSelected] = React.useState<string | null>(null);

  // Memoize the callback so ListItem doesn't re-render unnecessarily
  const handleSelect = useCallback((id: string) => {
    setSelected(id);
  }, []);

  return (
    <ul>
      {items.map((item) => (
        <MemoizedListItem
          key={item.id}
          id={item.id}
          title={item.title}
          isSelected={selected === item.id}
          onSelect={handleSelect}
        />
      ))}
    </ul>
  );
}

export const MemoizedList = memo(List);

/**
 * PERFORMANCE MONITORING
 * 
 * To identify which components need optimization:
 * 1. Use React DevTools Profiler (browser extension)
 * 2. Look for components with long "render duration"
 * 3. Check "why did this component render" feature
 * 4. Only optimize after measurement shows it's needed
 * 
 * Optimization Priority:
 * 1. 🔴 Critical: >1000ms render time
 * 2. 🟠 High: 100-1000ms
 * 3. 🟡 Medium: 10-100ms
 * 4. 🟢 Low: <10ms
 */

/**
 * COMMON MISTAKES TO AVOID
 * 
 * ❌ Creating objects/arrays inline:
 * const config = { enabled: true }; // New object on every render
 * const items = [1, 2, 3]; // New array on every render
 * 
 * ✅ Use useMemo instead:
 * const config = useMemo(() => ({ enabled: true }), []);
 * const items = useMemo(() => [1, 2, 3], []);
 * 
 * ❌ Creating functions inline:
 * onClick={() => handleClick(id)} // New function on every render
 * 
 * ✅ Use useCallback instead:
 * const handleClickMemo = useCallback(() => handleClick(id), [id]);
 * onClick={handleClickMemo}
 * 
 * ❌ Passing props that are always new:
 * <Component data={computeData()} /> // computeData() returns new object
 * 
 * ✅ Memoize expensive computations:
 * const data = useMemo(() => computeData(), [dependencies]);
 * <Component data={data} />
 */

export default {
  MemoizedSimpleCard,
  MemoizedDataGrid,
  MemoizedStatistics,
  MemoizedForm,
  MemoizedListItem,
  MemoizedList,
};

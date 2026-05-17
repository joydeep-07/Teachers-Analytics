import React from 'react';
import { cn } from './Button';

export const Table = ({ headers, data, renderRow, className }) => {
  return (
    <div className={cn("w-full overflow-auto rounded-lg border border-slate-200", className)}>
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="h-12 px-4 align-middle font-medium text-slate-500">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {data.length > 0 ? (
             data.map((item, index) => renderRow(item, index))
          ) : (
            <tr>
               <td colSpan={headers.length} className="p-4 text-center text-slate-500">
                  No data available.
               </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

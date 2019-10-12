class FixReviewTable < ActiveRecord::Migration[6.0]
  def change
    rename_column :reviews, :review, :opinion
  end
end
